export default {
    start: (wss) => {
        // ใน web socket ไม่จำเป็นต้องมี route แค่จัดการเรื่องของ event เท่านั้นว่ามี event อะไรบ้าง
        // on คือ function event ของ websocket 
        wss.on('connection', (socket) => {   // event connection เมื่อมีการเชื่อมต่อเข้ามาจะให้ทำงานใน callback function

            // ถ้ามีการ connect เข้ามาผ่าน websocket แล้วให้ log id ของ socket จำนวน 2 หลัก id จะเป็นการสุ่มของ web socket
            console.log(`User[${socket.id.substr(0, 2)}] connected`)

            // ถ้ามี event messaageTest ส่งมาที่ web socket ให้ทำอะไรใน function
            socket.on('messaageTest', (msg) => {
                // Emitting events จะเป็นการตอบกลับไปที่ทุกคนที่เชื่อมต่อเข้ามาใน websocket เป็นการ broadcast
                // parameter ตัวแรกของ event emit จะเป็น ชื่อ event
                // parameter ตัวที่สองของ event emit จะเป็นการตอบกลับเราสามารถประยุกต์ส่งเป็น JSON Object กลับไปได้
                console.log('', {msg})
                io.emit('messaageTest', `${socket.id.substr(0, 2)}: ${msg}`)
            })

            // event disconnect websocket จะบอกว่าใครเป็นคนออกไปแล้วจากการ connect
            socket.on('disconnect', () => {
                console.log(`User[${socket.id.substr(0, 2)}] disconnected`)
            })
        })
    }
}