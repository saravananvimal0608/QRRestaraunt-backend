
import { addCategory, getAllCategories, updateCategory, deleteCategory, getSingleCategory } from '../controller/categoryController.js'
import express from 'express'
import adminMiddleware from './../middleware/adminMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router()


router.post('/add', authMiddleware, adminMiddleware, addCategory)
router.get("/", authMiddleware, getAllCategories);
router.get("/:id", authMiddleware, getSingleCategory);
router.put("/:id", authMiddleware, adminMiddleware, updateCategory);
router.delete("/:id", authMiddleware, adminMiddleware, deleteCategory);

export default router