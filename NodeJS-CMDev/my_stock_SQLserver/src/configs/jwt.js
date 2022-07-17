import jwt from 'jsonwebtoken'
import path from 'path'
import fs from "fs"

// ดึง key เข้ามา
const privateKey = fs.readFileSync(path.join(__dirname, "../../s4t", "private.key"))
const publicKey = fs.readFileSync(path.join(__dirname, "../../s4t", "public.key"))

// config jwt
const signOptions = {
    issuer: 'youtube', // ผู้ที่ออก token
    audience: 'www.youtube.com', // ผู้ที่รับ token
    algorithm: 'RS256'
}

const generateToken = (payload) => jwt.sign( // สร้าง jwt
    payload,  // data jwt
    privateKey,  // เข้ารหัส private key
    {
        ...signOptions,  // config jwt
        expiresIn: '30d' // หมดอายุ token
    }
)

// verifyToken เปรียบเหมือน middleware ที่เช็คข้อมูลก่อนจะเข้าไปที่ route
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'] // รับ header authorization จาก req ที่เข้ามา
    const token = authHeader && authHeader.split(' ')[1] // ถ้ามี header authorization และ authorization: bearer xxxxx เข้ามาจริง
    if (!token) { // ถ้าไม่มี token ให้ return void และ status 401
        res.status(401).json()
        return
    }
    
    jwt.verify(
        token, publicKey, // นำ token ที่ถูกสร้างจาก privateKey ที่เข้ามาเทียบกับ publicKey 
        signOptions, // verify config jwt
        (error, decode) => { // decode คือ การดึงข้อมูลใน payload
            if (error) { // ถ้ามี error จากการ verify token
                res.status(401).json()
                return
            }

            // decode jwt payload ที่อยู่ใน header แล้วส่งกลับเข้าไปใน req เพื่อให้ route และ controller นำข้อมูลไปใช้ต่อ
            req.sub = decode.sub
            req.role = decode.role

            next() // ทำงานส่วนถัดไปต่อได้
        }
    )
}

export default {
    generateToken,
    verifyToken
}