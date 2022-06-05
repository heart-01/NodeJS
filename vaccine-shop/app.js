require("dotenv").config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const vaccineRouter = require('./src/modules/vaccine/vaccine.route')

const app = express()
const PORT = process.env.PORT || 2001

// Connect MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true })

// Middleware จะทำงานก่อนที่จะมาถึง Router
// app.use(express.static()) // เรียกใช้งาน Static file
app.use(express.urlencoded({ extended: true })) // แปลงข้อมูลจาก form ในรูปแบบ url encode เป็น Object 
app.use(express.json()) // การส่งข้อมูลบน Internet จะเป็นข้อมูลที่มีรูปแบบ octet-steam จะไม่สามารถเอาข้อมูลไปใช้งานได้ ต้องแปลงเป็นรูปแบบ Json Object
app.use(cors())

// Router
app.use('/api/vaccine', vaccineRouter)

// Router Basic
app.get('/', (req, res) => {
    res.send('Vaccine-Store service is running')
})

// Listen Server PORT
app.listen(PORT, () => {
    console.log('Vaccine-Store service is running on port', PORT)
})

module.exports = app