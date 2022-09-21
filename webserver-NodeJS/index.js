// Import HTTP Module สำหรับไว้สร้าง Web Server
const http = require('http')

// Import Path module เพื่ออ่านไฟล์ html
const path = require('path')

// Import File module
const fs = require('fs')

// อ่านไฟล์ html
const getPage = (page) => {
    const filePath = path.join(__dirname, page)
    return fs.readFileSync(filePath)
}

// Create Server
http.createServer((req, res)=>{

    console.log('url', req.url) // ดู url ที่ request เข้ามาว่าต้องการอะไีบ้างจาก frontend

    const fileType = path.extname(req.url) || '.html' // เช็ค filetype ที่เข้ามาว่าต้องการ filetype อะไรบ้าง ถ้าไม่มี type ให้กำหนดเป็น html เลย

    console.log({fileType})

    // 5 == 5 (true)
    // 5 == 5.0 (true)
    // 5 === 5.0 (false)

    if(fileType === '.html'){
        res.setHeader('Content-Type','text/html')

        if(req.url === '/'){
            res.write(getPage('index.html'))
        }else if(req.url === '/about'){
            res.write(getPage('about.html'))
        }
        res.end()
    }else if(fileType === '.css'){
        res.setHeader('Content-Type','text/css')
        res.write(getPage('style.css'))
        res.end()
    }
    
}).listen(3000)