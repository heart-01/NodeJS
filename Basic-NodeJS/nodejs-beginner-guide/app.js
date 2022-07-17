require("dotenv").config()

const express = require('express') // ใช้งาน module express
const cors = require('cors') // ใช้งาน module cors

// Route
productsRoute = require('./src/modules/products/products.route')

const app = express() // สร้างตัวแปร app เป็น instance ของ express app
const port = process.env.PORT || 3030  // port 

// app.use(express.static())  // เรียกใช้งาน static file เช่น ไฟล์รูปภาพ ไฟล์ js ไฟล์ css จะเป็น middleware function โดยใช้คำส่ง app.use ที่ใช้สำหรับกำหนดการใช้งาน static file หรือไฟล์ข้อมูลที่ไม่มีการเปลี่ยนแปลงบ่อย ๆ เกิดขึ้น เช่นไฟล์ JavaScript , ไฟล์รูปภาพ ,ไฟล์ css เหล่านี้เป็นต้น 

app.use(express.json()) // เรียกใช้งานสำหรับการแปลงข้อมูลที่เข้ามาให้อยู่ในรูปแบบ JSON Object ถ้าไม่ประกาศ NodeJS จะรับข้อมูลมาเป็น octet-steam ที่เก็บไว้ใน Buffer คือ <Buffer 5b 7b 22 6e 61 6d > จะไม่สามารถเอาข้อมูลไปใช้งานได้ ต้องแปลงเป็นรูปแบบ Json Object ก็จะได้ค่า [ { name: "mytext", value: "ths is a test" }, ] เราสามารถใช้ค่าต่างๆ เช่น จะใช้ค่า mytext ก็สามารถอ้างอิงผ่าน req.body[0].value ก็จะเท่ากับ "this is a test"

app.use(express.urlencoded({ extended: true })) // ใช้สำหรับแปลงข้อมูลจาก Form ในรูปแบบ URL encoding เป็น Object โดยปกติ ข้อมูลที่ส่งจากฟอร์ม จะอยู่ในรูปแบบ URL encoding ตัวอย่าง mytext=this+is+a+test&myhidden=1 มีฟิลด์ข้อมูลที่ชื่อว่า mytext มีค่าเท่ากับ "this is a test" และ ฟิลด์ข้อมูลที่ชื่อว่า myhidden มีค่าเท่ากับ 1 ถูกส่งเข้ามา สมมติว่าส่งมาแบบ POST ถ้าเป็น PHP เราก็สามารถอ้างอิงค่าตัวแปร ผ่าน $_POST['mytext'] และ $_POST['myhidden'] ตามลำดับ แต่ในสำหรับ NodeJs ซึ่งข้อมูลที่ถูกส่งมา จะเป็นแบบ octet-stream เราต้องทำการแปลงข้อมูลเป็น Object ก่อน จึงจะสามารถนำไปใช้งานต่อได้

app.use(cors()) // Set CORS เป็น Allow origin cors 

// Route Path หลัก
app.use('/product', productsRoute)

// http://localhost:2000/
app.get('/', (req, res) => {
    res.send('server is running...')
})

// รับฟังพอร์ต 2000 ตอน run server ครั้งแรก
app.listen(port, () => {
    console.log(`server is running on port -> ${port}`)
})