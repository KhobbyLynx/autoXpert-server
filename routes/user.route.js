import express from 'express'
import {
  getMe,
  loginUser,
  registerUser,
  logout,
  checkUserExists,
} from '../controllers/user.controller.js'
const router = express.Router()
import { protect } from '../middleware/auth.middleware.js'

router.post('/', registerUser)
router.post('/login', loginUser)
router.post('/logout', logout)
router.get('/me', protect, getMe)
router.get('/checkuser', checkUserExists)

export default router
