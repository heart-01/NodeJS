import { validationResult } from 'express-validator'
import { products } from '../../../common/mockup-data/products.js'
const localProduct = products

export default {
    getProducts: (req, res) => {
        res.json({
            success: true,
            data: products
        }).status(200)
    },
    getProductId: (req, res) => {
        const { id } = req.params
        console.log(typeof id)
        const found = products.find((product) => product.id === id)
        res.json({
            success: true,
            data: found
        }).status(200)
    },
    getProductName: (req, res) => {
        const { name } = req.params
        console.log(name);
        const found = products.filter((product) => product.name.includes(name))
        res.json({
            success: true,
            data: found
        }).status(200)
    },
    createProduct: (req, res) => {
        const { name, categories, price } = req.body
        const lastProduct = products[products.length -1] // ดึง product ตัวสุดท้าย

        localProduct.push({
            // String(+lastProduct.id + 1) เป็นการแปลง lastProduct.id ให้เป็น int แล้วบวก 1 เพื่อนจะได้ id ถัดไป
            // padStart จะเป็นการเพิ่มเลข 0 ข้างหน้าแล้วรวมให้ได้ 3 ตัวอักษรจะได้ -> "005"
            id: String(+lastProduct.id + 1).padStart(3, '0'), 
            name,
            categories,
            price
        })

        res.json({
            success: true,
            data: products
        })
    }
}