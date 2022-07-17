'use strict'

const mongoose = require("mongoose")

const { Schema, model } = mongoose
const ProductSchema = new Schema({
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
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
},{ toJSON: { virtuals: true }})

const ProductModel = model('Products', ProductSchema)
module.exports = ProductModel