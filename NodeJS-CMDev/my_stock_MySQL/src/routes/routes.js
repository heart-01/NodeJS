import express from "express"
import ProductRouter from '../modules/product/product.route.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.send(`MY STOCK MANAGEMENT is running`)
})

// Route
router.use('/api/product', ProductRouter)


export default router