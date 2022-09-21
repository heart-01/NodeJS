// Import HTTP Module สำหรับไว้สร้าง Web Server
const http = require("http");

// Create Server
http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html'); // ถ้าเป็น NodeJS response ต้อง Set Header กลับไปทุกครั้ง
    res.write('<h1>Hello Node JS</h1>')
    res.end()
}).listen(3000); // port 3000
