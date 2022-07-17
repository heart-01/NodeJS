import express from "express"
import jwt from "../configs/jwt.js"
import AccountRouter from "../modules/account/account.route.js"
import ProductRouter from '../modules/product/product.route.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.send(`MY STOCK MANAGEMENT is running`)
})

// Route
router.use('/api/product', jwt.verifyToken, ProductRouter)
router.use('/api/account', AccountRouter)


export default router