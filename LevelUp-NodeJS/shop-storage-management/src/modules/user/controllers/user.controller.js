import users from "../../../common/mockup-data/users.js"
import { createToken } from "../../../middlewares/authentication.js"
import UserService from "../services/user.service.js"

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

    getUsers: async (req, res) => {
        try {
            const found = await UserService.getAll()
            // const found = await UserService.getAll(['name', 'id'])

            res.status(200).json({
                success: true,
                data: found
            })
        }catch (error) {
            console.log(`[ERROR on getting user]: ${error.message}`)
            res.status(500).json({
                success: false,
                error
            })
        }
    },

    cretateUser: async (req, res) => {
        try {
            const { name } = req.body
            const created = await UserService.createOne({ name })

            res.status(201).json({
                success: true,
                data: created
            })
        }catch (error) {
            console.log(`[ERROR on creating user]: ${error.message}`)
            res.status(500).json({
                success: false,
                error
            })
        }
    }
}