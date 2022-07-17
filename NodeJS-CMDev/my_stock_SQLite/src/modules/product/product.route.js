import express from "express"
import ProductController from "./controllers/product.controller.js"

const router = express.Router()

router.get('/', ProductController.getProducts)
router.post('/', ProductController.createProduct)
router.put('/:id', ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)
router.get('/price', ProductController.getProductByPrice) // localhost:3030/price?min=50000&max=90000
router.get('/:id', ProductController.getProductById) // http://localhost:3030/api/product/2


export default router