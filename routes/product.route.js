import express from 'express'
import {
  getProducts,
  createProduct,
  singleProduct,
} from '../controllers/product.controller.js'

const router = express.Router()

router.get('/:id', singleProduct)
router.post('/', createProduct)
router.get('/', getProducts)

export default router
