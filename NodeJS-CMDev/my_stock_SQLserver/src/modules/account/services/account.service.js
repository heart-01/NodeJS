import AccountRepository from '../repositories/account.repository.js'
import bcrypt from 'bcrypt'
import jwt from '../../../configs/jwt.js'

// ส่วนของ business logic ไว้ Access กับ ProductRepository
const AccountService = {
    register: async (account) => {
        account.password = await bcrypt.hash(account.password, 8) // hash รหัสเข้าไปพร้อมกับ 8 คือ salt เข้าไปในรหัสใส่เป็น string หรือ int เข้าไปก็ได้
        return await AccountRepository.create(account)
    },
    login: async (username, password) => {
        const result = await AccountRepository.findByUsername(username)
        if(result && await bcrypt.compare(password, result.password)) { // bcrypt.compare เช็ค password เข้ามาว่าตรงกับที่เข้ารหัสในฐานข้อมูลไหม
            const payload = { // data ที่จะนำไปสร้าง token
                sub: result.username, // subject ต้องห้ามซ้ำกัน
                role: result.role,
                addtional: "todo",
                addtional1: "todo1"
            }
            return jwt.generateToken(payload) // สร้าง token และ return ออกไปเมื่อ login ถูกต้อง
        }

        return
    }
}

export default AccountService