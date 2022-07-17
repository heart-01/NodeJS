import express from "express"
import UserController from "./controllers/user.controller.js"
import { userAuthentication, adminAuthentication } from "../../middlewares/authentication.js"

const router = express.Router()

// router ทั้งหมดจะต้องผ่าน Middlewares userAuthentication ก่อนทั้งหมด
// router.use(userAuthentication)

// ใช้ middlewares adminAuthentication เพื่อเช็ค token ก่อนเข้าถึง controller
router.get('/', adminAuthentication, UserController.getUsers)
router.post('/login', UserController.login)
router.post('/', UserController.cretateUser)

export default router