const express = require('express')
const app = express()  // ตัวแปร app จะเก็บข้อมูลการสร้าง server ขึ้นมา รับค่าเป็น req และ res โดยใช้ lib express

// http://localhost:3030
app.get('/', (request, response) => {
    // response กลับไปยังผู้ที่เรียกใช้งาน port 3030 กลับไปเป็น text พร้อมกับ status 200
    response.send( 'Hello World').status(200)
})

const PORT = process.env.PORT || 3030  // เช็คที่ไฟล์ env ว่ามีการตั้งค่า PORT ไหม ถ้าไม่มีกำหนดให้เป็น 3000 
// รับฟังพอร์ต 3030 ตอน run server ทีแรกซึ่งอาจเหมาะสำหรับคุณหรือไม่ ทั้งนี้ขึ้นอยู่กับความต้องการของคุณและข้อกำหนดของสภาพแวดล้อมที่คุณใช้งานเซิร์ฟเวอร์ของคุณ
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT} ...`)
})