import { getShopDetails } from '../controller/shopController.js'
import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', authMiddleware, getShopDetails)

export default router