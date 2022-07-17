import multer from "multer" // package สำหรับ upload file
import fs from "fs" // fs คือ file system

// keyUpload ไว้สำหรับตอน upload รูปเข้ามาต้องส่ง key ให้ตรงกับ Model เข้ามาด้วย
export const keyUpload = "image"

export const multerConfig = {
    storage: multer.diskStorage({
        // ปลายทางที่เก็บ file
        destination: (req, file, next) => { // next คือ callback หลังจากที่ทำงานเสร็จแล้ว
            const folder = './images/'
            if(!fs.existsSync(folder)) { // ใช้ lib fs เช็คว่ามี folder ไหม ถ้าไม่มีจะสร้างใหม่
                fs.mkdirSync(folder)
            }
            next(null, folder)
        },
        // ชื่อไฟล์
        filename: (req, file, next) => {
            const type = file.mimetype.split('/')[1] // ดึง type ของ file
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) // สุ่มชื่อมาต่อท้ายชื่อไฟล์
            next(null, `${file.fieldname}-${uniqueSuffix}.${type}`)  // ${file.fieldname}-${uniqueSuffix}.${type} คือ การรวมชื่อไฟล์ xxxxx45454.jpg
        }
    }),
    // ขนาดไฟล์
    limits: {
        fieldSize: 1024 * 1024 * 5, // 5 MB
    },
    // เช็คชนิดไฟล์ที่จะเก็บเข้ามา
    fileFilter: (req, file, next) => {
        const typeArray = file.mimetype.split('/') // เช็คชนิดไฟล์ที่เข้ามาใน multipart/form-data ว่าเป็น image ไหม
        const fileType = typeArray[1]

        if(fileType !== 'png' && fileType !== 'jpg' && fileType !== 'gif' && fileType !== 'jpeg') {
            next({message: `File type not supported ${fileType}`}, false)
        }else{
            next(null, true)
        }
    }
}