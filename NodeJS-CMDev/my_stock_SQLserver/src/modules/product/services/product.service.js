import ProductRepository from '../repositories/product.repository.js'

// ส่วนของ business logic ไว้ Access กับ ProductRepository
const ProductService = {
    findAll: async () => await ProductRepository.findAll(),  // SELECT * FROM Products
    findOneById: async (id) => await ProductRepository.findOneById(id),
    findByPrice: async (min, max) => await ProductRepository.findByPrice(min, max),
    create: async (payload, file) => { // ...payload คือ Spread Operator จะเป็นการกระจายค่าจาก array, object ต้นทางไป ที่ array, object ปลายทาง
        await ProductRepository.create({...payload, image: file ? file.filename : ""}) // file ? file.filename: "" ถ้ามีไฟล์เข้ามาให้ใช้ชื่อของไฟล์ แต่ถ้าไม่มีให้เป็นค่าว่าง
        return await ProductRepository.findAll()
    },
    updateById: async (id, payload, file) => {
        const result = await ProductRepository.findOneById(id)
        if(result){
            // ค้นหา id database เจอ
            const updated = await ProductRepository.updateById(result.id, {...payload, image: file ? file.filename : result.image})
            if(updated) {
                // Update Success
                return await ProductRepository.findOneById(id)
            }
        }
        return null
    },
    deleteById: async (id) => {
        const result = await ProductRepository.findOneById(id)
        if(result){
            // ค้นหา id database เจอ
            const deleted = await ProductRepository.deleteById(id)
            if(deleted) {
                // Delete Success
                return await ProductRepository.findAll()
            }
        }
        return false
    },
}

export default ProductService