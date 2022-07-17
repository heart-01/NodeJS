import express from "express"
import cors from "cors"
import swagger from "./swagger.js"
import ProductRouter from './src/modules/product/product.route.js'
import UserRouter from "./src/modules/user/user.route.js"

const app = express()
const PORT = process.env.PORT || 3030

app.use(express.urlencoded( { extended: true } ))
app.use(express.json())
app.use(cors())

app.use('/docs', swagger.serve, swagger.setUp) // path swagger
app.use('/api/product', ProductRouter)
app.use('/api/user', UserRouter)

app.get('/', (req, res) => {
    res.send(`SHOP STORAGE MANAGEMENT is running`)
})

app.listen(PORT, () => {
    console.log('SHOP STORAGE MANAGEMENT is running on port', PORT)
})

export default app