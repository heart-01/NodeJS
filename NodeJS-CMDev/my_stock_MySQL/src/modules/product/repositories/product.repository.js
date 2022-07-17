import db from '../../../databases/models'
import {Op} from 'sequelize'   // Op คือ operation ตัวดำเนินการในฐานข้อมูล เช่น เท่ากับ มากกว่า น้อยกว่า

//  ส่วน Access Database ไว้ติดต่อกับฐานข้อมูล
const ProductRepository = {
    findAll: async () => await db.Products.findAll({  // ค้นหาทั้งหมด
        order: [    // เรียงลำดับตาม id
            ['id', 'DESC']
        ]
    }),
    findOneById: async (id) => await db.Products.findByPk(id), // ค้นหาตาม PK
    findByPrice: async (min, max) => await db.Products.findAll({ // ค้นหาทั้งหมด
        where: {    // เงื่อนไขการค้นหา
            price: {
                [Op.gte]: min, // gte คือ >=
                [Op.lte]: max  // lte คือ <=
            }
        }
    }),
    create: async (product) => await db.Products.create(product),
    updateById: async (id, product) => await db.Products.update(product, {
        where: {
            id: id
        }
    }),
    deleteById: async (id) => await db.Products.destroy({
        where: {
            id: id
        }
    })
}

export default ProductRepository