import db from '../../../databases/models'

//  ส่วน Access Database ไว้ติดต่อกับฐานข้อมูล
const AccountRepository = {
    create: async (account) => await db.Accounts.create(account),
    findByUsername: async (username) => await db.Accounts.findOne({
        where: {
            username
        }
    })
}

export default AccountRepository