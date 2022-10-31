const {Router} = require('express')
const ProductosRouter=require('./productos')
const router = Router()
router.get('/', (req, res)=>{
    res.json({
        msg: 'ok app'
    })
})
router.use('/products', ProductosRouter)
module.exports= router
