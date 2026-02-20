
import { addProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, getProductsByCategory } from '../controller/productController.js'
import adminMiddleware from './../middleware/adminMiddleware.js';
import tempMiddleWare from './../middleware/tempMiddleWare.js';
import express from 'express'

const router = express.Router()


router.post('/add', tempMiddleWare, adminMiddleware, addProduct)
router.get("/", tempMiddleWare, getAllProducts);
router.get("/:id", tempMiddleWare, getSingleProduct);
router.put("/:id", tempMiddleWare, adminMiddleware, updateProduct);
router.delete("/:id", tempMiddleWare, adminMiddleware, deleteProduct);
router.get("/category/:categoryId", tempMiddleWare, getProductsByCategory);



export default router