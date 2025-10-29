import { Router } from 'express'
import {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js'

const router = Router()

router.get('/products', getAllProducts)
router.get('/products/:id', getSingleProduct)
router.post('/products', createProduct)
router.put('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)

export default router
