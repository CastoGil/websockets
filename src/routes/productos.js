const { Router } = require("express");
const { ProductsController } = require("../controller/productos.js");
const router = Router();

//Mostrar todos los productos en memoria /api/products
router.get("/", (req, res) => {
    const products=ProductsController.getAll()
    res.render('./parcials/vista' , {products})
  //res.json({
  // msg: ProductsController.getAll(),
 // });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const idProduct = ProductsController.getById(id);
  res.json({
    msg: idProduct,
  });
});
//ingresar productos por formulario y redireccionar al index
router.post("/", (req, res) => {
  const { body } = req;
  const newProduct = {
    title: body.title,
    price: parseInt(body.price),
    pictureUrl: body.pictureUrl,
  };
  const info=ProductsController.save(newProduct)
  console.log(info)
  //res.json({
   // msg: info,
 // });
  res.redirect('/')
});


router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { body } = req;
  res.json({
    msg: ProductsController.findById(id, body),
  });
});
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    res.json({
    msg: ProductsController.findByIdDelete(id),
  });
});
module.exports = router;
