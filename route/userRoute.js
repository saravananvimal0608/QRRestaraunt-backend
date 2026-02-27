import { loginUser, createAdmin, allUser, deleteUser, updatePassword, resetPassword, createSalesman } from '../controller/userController.js'
import express from 'express'
import adminMiddleware from './../middleware/adminMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()


router.post('/create', createAdmin)
router.post('/login', loginUser)
router.get('/allUser',authMiddleware,adminMiddleware, allUser)
router.delete('/delete/:id',authMiddleware,adminMiddleware, deleteUser)
router.post('/forgotmail', updatePassword)
router.post('/reset/:token', resetPassword)
router.post('/create/salesman', authMiddleware, adminMiddleware, createSalesman)
export default router
