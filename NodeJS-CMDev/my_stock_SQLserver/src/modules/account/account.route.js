import express from "express"
import jwt from "../../configs/jwt.js"
import AccountController from './controllers/account.controller.js'

const router = express.Router()

router.post('/register', AccountController.register)
router.post('/login', AccountController.login)
router.get('/info', jwt.verifyToken, AccountController.profileInfo)

export default router