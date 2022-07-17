import { RoleEnum } from '../common/roles.enum.js'
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY

// middlewares ของ user
export const userAuthentication = (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1] // ดึง token header ออกจาก Bearer
    console.log(token);
    // ถ้าไม่มี token เข้ามา
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token Unauthorized'
        })
    }

    const decoded = JWT.decode(token, SECRET_KEY) // ถอดรหัส jwt token จะเห็นข้อมูล
    console.log({token, decoded})

    // เช็ค token ว่าหมดอายุไหม
    if(token && decoded.exp <= Date.now() / 1000) {
        return res.status(401).json({
            success: false,
            message: 'token expired'
        })
    }

    // เช็คว่า role ของ payload ที่ส่งเข้ามาตรงกับ role ที่เรากับหนดไว้ไหม
    // Object.values(RoleEnum) ดึงค่า Values ของ Object RoleEnum จะได้เป็น Array List แล้ว .some เช็คว่า Value ใน payload ตรงกับ ใน Array List ไหมจะ return callback กลับไปเป็น true ถ้ามีข้อมูล
    const validateRole = !Object.values(RoleEnum).some((role) => role === decoded.role)
    
    // เช็ค token ว่ามีข้อมูล Role ใน payload ผิดไหมถ้าผิดจะทำงานเพราะถูกกลับ logic
    if(token && validateRole) {
        return res.status(401).json({
            success: false,
            message: 'Role Unauthorized'
        })
    }

    next()
}

// middlewares ของ admin
export const adminAuthentication = (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1] // ดึง token header ออกจาก Bearer
    console.log(token);
    // ถ้าไม่มี token เข้ามา
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token Unauthorized'
        })
    }

    const decoded = JWT.decode(token, SECRET_KEY) // ถอดรหัส jwt token จะเห็นข้อมูล
    console.log({token, decoded})

    // เช็ค token ว่าหมดอายุไหม
    if(token && decoded.exp <= Date.now() / 1000) {
        return res.status(401).json({
            success: false,
            message: 'token expired'
        })
    }

    // เช็คว่า role ของ payload ที่ส่งเข้ามาตรงกับ role ที่เรากับหนดไว้ไหม
    const validateRole = decoded.role !== RoleEnum.ADMIN
    
    // เช็ค Role ว่าถูกต้องกับที่กำหนดไว้ไหม
    if(token && validateRole) {
        return res.status(401).json({
            success: false,
            message: 'Role Unauthorized'
        })
    }

    next()
}

//({ name, username, role }) คือ data payload ที่เข้ามาใน function createToken
export const createToken = ({ name, username, role }) => JWT.sign( // JWT.sign คือ สร้าง token jwt
    { name, username, role }, // data payload ที่จะสร้าง token
    SECRET_KEY,               // key ภายใน
    { expiresIn: '7d' }       // วันหมดอายุ
)