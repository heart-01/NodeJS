import ProductModel from '../models/product.model.js'

const products = [
    new ProductModel(1, "Macbook Pro", "", 90000, 0),
    new ProductModel(2, "iPhone XS", "", 50000, 10),
]

const ProductService = {
    findAll: () => products,
    findOneById: (id) => products.filter(product => product.id === id),
    findByPrice: (min, max) => products.filter(product => product.price >= +min && product.price <= +max),
    create: (payload, file) => {
        const {id, name, price, stock} = payload
        const productNew = new ProductModel(+id, name, file ? file.filename : "", +price, +stock) // file ? file.filename: "" ถ้ามีไฟล์เข้ามาให้ใช้ชื่อของไฟล์ แต่ถ้าไม่มีให้เป็นค่าว่าง
        products.push(productNew)
        return products
    },
    updateById: (id, payload, file) => {
        const index = products.findIndex(product => product.id === id ) // ค้นหา index array โดยเช็คจาก id จะได้เลข index array ถ้าไม่เจอจะ return -1
        if(index !== -1){
            const {name, price, stock} = payload
            const productUpdate = new ProductModel(id, name, file ? file.filename: products[index].image, +price, +stock) // file ? file.filename: products[index].image ถ้ามีไฟล์เข้ามาให้ใช้ชื่อของไฟล์ แต่ถ้าไม่มีให้ใช้ชื่อไฟล์เดิมโดยค้นจากตำแหน่งใน index products
            products[index] = productUpdate
            return products
        }
        return null
    },
    deleteById: (id) => {
        const index = products.findIndex(product => product.id === id ) // ค้นหา index array โดยเช็คจาก id จะได้เลข index array ถ้าไม่เจอจะ return -1
        if(index !== -1){
            products.splice(index, 1) // ตัดตั้งแต่ index ที่ค้นหาเจอ แล้วเลข 1 ก็คือตัวที่้นหาเจอ
            return products
        }
        return false
    },
}

export default ProductService