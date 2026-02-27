import { loginUser, createAdmin, allUser, deleteUser, updatePassword, resetPassword, createSalesman,createSuperAdmin } from '../controller/userController.js'
import express from 'express'
import adminMiddleware from './../middleware/adminMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js'
import superAdminMiddleware from '../middleware/superAdminMiddleware.js';

const router = express.Router()

//superAdmin
router.post('/create/admin', authMiddleware, superAdminMiddleware, createAdmin)
router.post('/create/superAdmin', createSuperAdmin)
// admin 
router.post('/create/salesman', authMiddleware, adminMiddleware, createSalesman)
router.get('/allUser', authMiddleware, adminMiddleware, allUser)
router.delete('/delete/:id', authMiddleware, adminMiddleware, deleteUser)

//common
router.post('/login', loginUser)
router.post('/forgotmail', updatePassword)
router.post('/reset/:token', resetPassword)
export default router
