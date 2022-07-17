import ProductModel from '../models/product.schema.js'

const ProductService = {
  create: (payload) => {
    return new ProductModel(payload).save()
  },
  getAll: (query) => {
    return ProductModel.find(query)
  },
  getOneById: (id) => {
    return ProductModel.findOne({ _id: id })
  },
  updateById: (id, payload) => {
    return ProductModel.findOneAndUpdate({ _id: id }, payload)
  },
  deleteById: (id) => {
    return ProductModel.findOneAndDelete({ _id: id })
  },
  aggregate: (query) => {
    return ProductModel.aggregate(query)
  }
}

export default ProductService