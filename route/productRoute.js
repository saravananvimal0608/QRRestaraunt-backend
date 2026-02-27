
import { addProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, getProductsByCategory } from '../controller/productController.js'
import adminMiddleware from './../middleware/adminMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js';
import express from 'express'

const router = express.Router()


router.post('/add', authMiddleware, adminMiddleware, addProduct)
router.get("/", authMiddleware, getAllProducts);
router.get("/:id", authMiddleware, getSingleProduct);
router.put("/:id", authMiddleware, adminMiddleware, updateProduct);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);
router.get("/category/:categoryId", authMiddleware, getProductsByCategory);



export default router