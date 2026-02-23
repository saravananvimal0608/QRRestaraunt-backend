import { loginUser, createUser, allUser, deleteUser, updatePassword, resetPassword } from '../controller/userController.js'
import express from 'express'

const router = express.Router()


router.post('/create', createUser)
router.post('/login', loginUser)
router.get('/allUser', allUser)
router.delete('/delete/:id', deleteUser)
router.post('/forgotmail', updatePassword)
router.post('/reset/:token', resetPassword)

export default router