import { validationResult } from "express-validator"

// middleware check ก่อนเข้าไปใน controller
export const validator = (req, res, next) => {
    const errors = validationResult(req); // ประกาศ errors ไปเรียกใช้งาน validation ที่เช็คจาก request
    if (!errors.isEmpty()) {    // ถ้ามี error
        return res.status(400).json({ errors: errors.array() });
    }

    next()
}