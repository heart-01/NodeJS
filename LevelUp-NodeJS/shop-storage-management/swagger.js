import swaggerJSDoc from 'swagger-jsdoc'
import swaggUI from 'swagger-ui-express'

// Swagger Header
const swaggerDefinition = {
    openapi: '3.0.0',
    // อธิบายรายละเอียดเกี่ยวกับ api
    info: {
        title: 'Shop Storage Management Service',
        version: '1.0.0'
    },
    // อธิบายว่าจะเข้าถึง api ได้จากที่ server ไหนได้บ้าง
    servers: [
        {
            url: 'http://localhost:3030',
            description: 'Develop Mode'
        }
    ]
}

const options = {
    swaggerDefinition,
    // apis จะอธิบายว่า Server เรามีไฟล์ route ไหนบ้าง
    apis: ['./app.js', './src/modules/product/product.route.js']
}

// ส่งออกไปใช้งาน
export default {
    serve: swaggUI.serve,
    setUp: swaggUI.setup(swaggerJSDoc(options))
}