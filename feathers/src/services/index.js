const product = require('./product/index.js')

module.exports = (app) => {
    // ลงทะเบียน service ชื่อ product เพื่อใช้งาน feathers
    app.configure(product)
}