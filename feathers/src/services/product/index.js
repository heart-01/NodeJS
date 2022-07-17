const productModel = require('../../models/product.schema.js')
const services = require('feathers-mongoose')
const hooks = require('./hooks')

module.exports = function () {
    const app = this // this หมายถึง ฝั่งที่มีการ call เรียก function นี้

    // Setup Model
    const options = {
        Model: productModel,
        paginate: false,
        lean: true,
    }

    // Initialize our service method GET, POST, PATCH, UPDATE, REMOVE in request with any options
    app.use('/product', services(options))

    // Get our initialize service to that we can bind hooks เป็นการ custom method GET, POST, PATCH, UPDATE, REMOVE in request
    app.service('/product').hooks(hooks)
}