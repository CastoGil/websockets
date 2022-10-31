//Iniciando Api con express
const express = require("express");
const path = require("path");
const mainRouter = require("../routes/index");
const app = express();
const io = require('socket.io'); //leemos el servidor socket
const http = require("http");

const { ProductsController } = require("../controller/productos"); //leemos el controlador de los productos

//Servidor http y ioServer
const httpServer= http.Server(app)
const socketServer= io(httpServer)

//Servidor para el chat
socketServer.on("connection", (socket) => {
  let today= new Date()
  let now= today.toLocaleString()
  socket.on("newuser", (username)=>{
    socket.broadcast.emit("update", username + " se unio a la conversación " + now)
  })
  socket.on("exituser", (username)=>{
    socket.broadcast.emit("update", username + " ha abandonado la conversación " + now)
  })
  socket.on("chat", (message)=>{
    socket.broadcast.emit("chat", message)
  })

  console.log("new user connected. Soquet id:", socket.id);
});

//middlewares
app.use(express.json()); //leer en formato json
app.use(express.urlencoded({ extended: true })); //leer en formato formulario
app.use(express.static("public")); //lee la carpeta public

//Configuracion Ejs
app.set("view engine", "ejs");
const viewsPath = path.resolve(__dirname, "../../public/views");
app.set("views", viewsPath);
//

//Llamando la view principal (index.ejs)
app.get("/", (req, res) => {
  const products = ProductsController.getAll();
  res.render("../../public/views/index.ejs", { products });
});

//En caso de error de la API muestra un mensaje
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({
    message,
  });
});
app.use("/api", mainRouter);
module.exports = httpServer;
