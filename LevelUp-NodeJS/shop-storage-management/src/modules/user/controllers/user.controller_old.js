import users from "../../../common/mockup-data/users.js"
import { createToken } from "../../../middlewares/authentication.js"

export default {
    login: (req, res) => {
        const { username } = req.body
        const found = users.find((user) => user.username === username)

        // ถ้าไม่เจอข้อมูล
        if(!found){
            res.json({
                success: true,
                data: 'User not found'
            }).status(403)
        }

        // ถ้าเจอข้อมูล
        // สร้าง token
        const token = createToken({  
            name: found.name,
            username: found.username,
            role: found.role
        })

        res.json({
            success: true,
            data: {
                // user: found,
                // ...found ดึงแค่ value มา
                ...found,
                //token: token สามารใช้ token อย่างเดียวแทนได้กรณีที่ key กับ value เหมือนกัน
                token
            }
        }).status(200)
    },

    getUsers: (req, res) => {
        res.json({
            success: true,
            users // List ของ User ทั้งหมด
        })
    }
}