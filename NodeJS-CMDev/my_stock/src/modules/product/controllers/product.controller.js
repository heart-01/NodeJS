import multer from "multer" // package สำหรับ upload file
import {multerConfig, keyUpload} from '../../../configs/multer.js'
import ProductService from '../services/product.service.js'

// config upload 1 รูปภาพ
const upload = multer(multerConfig).single(keyUpload)

export default {
    async getProducts(req, res) {
        const found = await ProductService.findAll()
        res.status(200).json({
            success: true,
            data: found
        })
    },
    async getProductById(req, res)  {
        const { id } = req.params
        const found = await ProductService.findOneById(+id)
        res.status(200).json({
            success: true,
            data: found.length > 0 ? found : {}
        })
    },
    async getProductByPrice (req, res)  {
        const { min, max } = req.query
        const found = await ProductService.findByPrice(min, max)
        res.status(200).json({
            success: true,
            data: found ? found : {}
        })
    },
    createProduct (req, res)  {
        // const { name, price, stock } = req.body
        upload(req, res, (error) => {
            // เช็คการ upload รูปเข้ามาว่ามี error ตามที่เรา config ไว้ไหม
            if(error) {
                console.log(`error: ${JSON.stringify(error)}`)
                return res.status(500).json({
                    success: true,
                    message: error
                })
            }
            // ไม่ error
            const product = ProductService.create(req.body, req.file)
            res.status(201).json({
                success: true,
                data: product
            })
        })
    },
    updateProduct (req, res)  {
        const { id } = req.params
        // const { name, price, stock } = req.body

        upload(req, res, async (error) => {
            // เช็คการ upload รูปเข้ามาว่ามี error ตามที่เรา config ไว้ไหม
            if(error) {
                console.log(`error: ${JSON.stringify(error)}`)
                return res.status(500).json({
                    success: true,
                    message: error
                })
            }
            // ไม่ error
            const product = ProductService.updateById(+id, req.body, req.file)
            if(product){
                res.status(201).json({
                    success: true,
                    data: product
                })
            }else{
                res.status(204).json({
                    success: false
                })
            }
        })
    },
    async deleteProduct (req, res)  {
        const { id } = req.params
        const product = await ProductService.deleteById(+id)
        if(product){
            res.status(200).json({
                success: true,
                data: product
            })
        }else{
            res.status(204).json({
                success: false
            })
        }
    },
}