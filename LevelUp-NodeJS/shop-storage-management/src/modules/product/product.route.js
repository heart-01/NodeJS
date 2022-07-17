import express from "express"
import ProductController from "./controllers/product.controller.js"
import { body, param } from 'express-validator'
import { createValidator } from "./validators/product-create.validator.js"
import { validator } from "../../middlewares/validator.result.js"
import { MiddlewaresValidate } from "../../middlewares/validator.js"

const router = express.Router()

/**
 * ดูเพิ่มเติมได้ที่ https://www.npmjs.com/package/swagger-ui-express
 * @swagger
 *  /api/product:
 *    get:
 *      tags:
 *          - 'product'
 *      summary: Get all products
 *      description: Get all products
 *      responses:
 *          '200':
 *            description: List of products
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 * 
 */

router.get('/', ProductController.getProducts)

/**
 * @swagger
 *  /api/product/{id}:
 *    get:
 *      tags:
 *          - 'product'
 *      summary: Get Product by ID
 *      description: Get Product by ID
 *      parameters:
 *          - in: id
 *            name: id
 *            required: true
 *            description: Product ID
 *            schema:
 *              type: string
 *      responses:
 *          '200':
 *            description: List of products
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
*/
//param('id').isInt() เป็นการใช้ express-validations 
// .toInt() เป็น Sanitization ที่เตรียมมาให้ใช้งานใน express-validations คือ การแปลง type หลังผ่านการ validations ปกติค่าที่ผ่าน url มาจะเป็น string เลยต้องแปลงเพื่อเอาไปใช้งานได้เลยไม่ต้องมานั่งแปลง type เอง
router.get('/:id', param('id').isInt().withMessage("Id is Integer").toInt(), validator, ProductController.getProductId)

//param แบบ custom logic
router.get('/search/:name', param('name').custom((param, { req, res }) => {
    if(param.length > 5) {
        throw new Error('Name is length 5 than existed items')
    }
    return true
}).customSanitizer((param) => param.toString()), validator, ProductController.getProductName)

// เขียนแบบ check file schema ใช้ไฟล์ product-create.validator
router.post('/', createValidator, validator, ProductController.createProduct)

// * เขียนแบบใช้ไฟล์ middlewares ไม่ใช้ file schema จะกองรวมกันที่ตรงนี้
// router.post('/', MiddlewaresValidate([
//     body('name').isString().withMessage(`name must be a string`),
//     body('categories').custom((value) => {
//         if (!Array.isArray(value)){ // หมวดหมู่ต้องเป็น Array 
//             throw new Error(`Categories must be Array, but got ${typeof value}`)
//         }

//         // loop ค่าที่อยู่ใน array มาดูว่าเป็น string ไหม
//         if (value.some((each) => typeof each !== 'string')){
//             throw new Error(`Element of Categories must be String, but got ${each}`)
//         }

//         // ถ้าผ่านการ validate
//         return true 
//     }),
//     body('price').isInt().withMessage(`price must be a number`),
// ]), ProductController.createProduct)

export default router