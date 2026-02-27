import express from 'express'
import { createOrder, getOrders } from '../controller/orderController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const route = express.Router()

route.post('/', authMiddleware, createOrder)
route.get('/', authMiddleware, getOrders)

export default route;
