import express from 'express'
import cors from 'cors'
import './src/configs/mongoose.db.js'
import ProductRouter from './src/modules/product/product.route.js'

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use('/product', ProductRouter)

app.get('/', (req, res) => {
  res.send('MONGODB service ...')
})

const PORT = process.env.PORT || 3030
app.listen(PORT, () => {
  console.log(`MONGODB IS RUNNING on port [${PORT}]`)
})

export default app