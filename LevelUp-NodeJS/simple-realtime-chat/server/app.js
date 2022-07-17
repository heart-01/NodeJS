import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import WebSocket from './src/modules/webSocket/websocket.js'

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

const server = http.createServer(app) // http server แบบปกติที่มาจาก restful api
// route ของ http server
app.get('/', (req, res) => {
    res.send(`[${new Date().toDateString}]: REALTIME CHAT SERVICE is running`)
})

// server ของ socker.io จะเป็นตัวกลางในการรับส่งข้อมูลแยกตัวกับ http server ประกาศ cors ให้สามารถเชื่อมต่อได้จากทุกโดเมน
const wss = new Server(server, { cors: { origin: '*' } }) // wss คือ web socket server
WebSocket.start(wss)

// port ของ http server
const PORT = process.env.PORT || 3030
app.listen(PORT, () => {
    console.log(`REALTIME CHAT SERVICE [HTTP] is running on port [${PORT}]`)
})

// port ของ web socket
const WS_PORT = process.env.WS_PORT || 3031
server.listen(WS_PORT, () => {
    console.log(`REALTIME CHAT SERVICE [WS] is running on port [${WS_PORT}]`)
})
  
export default app