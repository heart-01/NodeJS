import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import routes from './src/routes/routes.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3030
const corsOptions = {
    origin: ['http://localhost:4200', 'http://example.com'],
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.urlencoded( { extended: true } ))
app.use(express.json())
app.use(routes)
app.use('/images', express.static('./images')) // localhost:3030/image/xxxx.png

app.listen(PORT, () => {
    console.log('MY STOCK MANAGEMENT is running on port', PORT)
})

export default app