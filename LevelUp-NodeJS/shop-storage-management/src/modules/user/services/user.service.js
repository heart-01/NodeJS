import db from '../../../config/sql-db-config.js'
import { UserModel } from '../models/user.model.js'

// table name
const TableName = 'users'

// function query database
const doQuery = (sql, option) => {
    return new Promise ((resolve, reject) => {
        db.query(sql, option, (err, res) =>{
            if (err) {
                throw err
            }

            resolve(res)
        })
    })
}

export default {
    createOne: (form) => {
        // INSERT INTO users SET `name` = John, `status` = 1;
        return doQuery(`INSERT INTO ${TableName} SET ?`, { ...form, createAt: new Date(), updateAt: new Date(), status: 1 })
    },
    getAll: (column = UserModel) => { // ถ้าไม่มี parameter เข้ามาว่าจะ SELECT อะไรบ้างก ก็จะ default ให้ตาม UserModel
        const options = [column, TableName ] // จะผูกกับ ?? value ตามตำแหน่ง index ใน array options
        return doQuery(`SELECT ?? FROM ?? WHERE status = 1`, options)
    }
}