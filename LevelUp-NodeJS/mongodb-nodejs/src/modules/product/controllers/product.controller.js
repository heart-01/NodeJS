import ProductService from '../services/product.service.js'

const ProductController = {
  createProduct: async (req, res) => {
    try {
      const created = await ProductService.create(req.body)

      res.status(201).json({
        succes: true,
        data: created
      })
    } catch (error) {
      console.error(`[ERROR ON GET PRODUCT] => ${error.message}`)
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },
  getAllProduct: async (req, res) => {
    try {
      const products = await ProductService.getAll()
    
      res.status(200).json({
        success: true,
        data: products
      })
    } catch (error) {
      console.error(`[ERROR ON GET PRODUCT] => ${error.message}`)
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },
  getProductByIds: async (req, res) => {
    try {
      const ids = req.params.ids.split(',')
      const products = await ProductService.getAll({ _id: { $in: ids } })
    
      res.status(200).json({
        success: true,
        data: products
      })
    } catch (error) {
      console.error(`[ERROR ON GET PRODUCT] => ${error.message}`)
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },
  editProductById: async (req, res) => {
    try {
      const { id } = req.params
      const updated = await ProductService.updateById(id, req.body)
    
      res.status(200).json({
        success: true,
        data: updated
      })
    } catch (error) {
      console.error(`[ERROR ON EDIT PRODUCT] => ${error.message}`)
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },
  deleteProductById: async (req, res) => {
    try {
      const { id } = req.params
      const updated = await ProductService.deleteById(id)
    
      res.status(200).json({
        success: true,
        data: updated
      })
    } catch (error) {
      console.error(`[ERROR ON DELETE PRODUCT] => ${error.message}`)
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  }
}

export default ProductController