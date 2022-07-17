import mongoose from 'mongoose'
import AutoIncrement from '../../../plugins/auto-increment.plugin.js'

const { Schema, model } = mongoose
const ProductSchema = new Schema({
  _id: {
    type: Number,
    required: true,
    unique: true,
    default: 0
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    default: ''
  }
}, { timestamps: true, strict: true, _id: false })

ProductSchema.plugin(AutoIncrement, { id: 'products_seq', inc_field: '_id'})
const ProductModel = model('products', ProductSchema)
export default ProductModel