// เขียนโดย NodeJS โดยตรงไม่ผ่าน lib Express
const HTTP = require('http') // เรียกใช้งาน http เก็บไว้ที่ตัวแปร http
const PORT = process.env.PORT || 3030 // เช็คที่ไฟล์ env ว่ามีการตั้งค่า PORT ไหม ถ้าไม่มีกำหนดให้เป็น 3000 เก็บไว้ที่ตัวแปร port

// http://localhost:3030
const app = HTTP.createServer((req, res) => { // ตัวแปร app จะเก็บข้อมูลการสร้าง server ขึ้นมา รับค่าเป็น req และ res
    res.statusCode = 200 // กำหนด status code เมื่อมีการส่งค่ากลับไปจะแนบ status ไปด้วย
    res.setHeader('Content-Type', 'text/plain') // response กลับไปยังผู้ที่เรียกใช้งาน port 3030 กลับไปเป็น text
    res.end('Hello World') // ส่งข้อมูลกลับไปเป็น String
})

// รับฟังพอร์ต 3030 ตอน run server ทีแรกซึ่งอาจเหมาะสำหรับคุณหรือไม่ ทั้งนี้ขึ้นอยู่กับความต้องการของคุณและข้อกำหนดของสภาพแวดล้อมที่คุณใช้งานเซิร์ฟเวอร์ของคุณ
app.listen(PORT, () => { 
    console.log(`server is running on port ${PORT}`)
})