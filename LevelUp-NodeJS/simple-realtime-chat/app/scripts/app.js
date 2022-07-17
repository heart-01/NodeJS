const socket = io('ws://localhost:3031') // server ของ websocket

const messages = document.getElementById('messages')
const form = document.getElementById('form')
const input = document.getElementById('input')

// เมื่อเกิด Event submit ของ from แล้วให้ทำงาน
form.addEventListener('submit', (event) => {
  event.preventDefault()
  if (input.value) { // ถ้ามีข้อความใน input
    socket.emit('messaageTest', input.value) // ส่งข้อความเข้าไปที่ event ของ websocket ชื่อ messaageTest
    input.value = ''
  }
})

// เมื่อมีการตอบกลับมาจาก websocket event messaageTest ให้ทำงาน
socket.on('messaageTest', (msg) => {
  const item = document.createElement('li')
  item.textContent = msg
  messages.appendChild(item)
  window.scrollTo(0, document.body.scrollHeight)
})