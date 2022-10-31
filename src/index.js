//SERVIDOR ESCUCHANDO EN EL PUERTO
const server= require ('./services/server')
const PUERTO= 8080
server.listen(PUERTO, ()=>{
    console.log(`Servidor Escuchando en el ${PUERTO}`)
})