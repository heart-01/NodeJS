const express = require('express')

// import file แบบเริ่มที่ root กับ แบบเริ่มที่ไฟล์นี้
// const productsController = require('/src/modules/products/controllers/products.controller') 
const productsController = require('./controllers/products.controller') 

const router = express.Router() // กำหนด router instance การทำงานให้กับ URL หรือ Path ต่างๆ ที่เรียกเข้ามา

// http://localhost:2000/product/
router.get('/', productsController.getProducts) // path ย่อยในการเรียกใช้งาน productsController method getProducts
router.get('/:id', productsController.getProductByld) // path แบบรับ parameter

module.exports = router