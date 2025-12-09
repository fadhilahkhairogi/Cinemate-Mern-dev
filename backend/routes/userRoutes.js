//userRoutes.js
import express from 'express'
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js'
import { getUserProfile } from '../controllers/profileController.js'
import { checkAuth } from '../middleware/checkAuth.js'
import { checkAdmin } from '../middleware/checkAdmin.js'

const router = express.Router()
//=====================================================
//auth routes
//=====================================================

// Register route
router.post('/register', registerUser)

// Login route
router.post('/login', loginUser)

// Logout route
router.post('/logout', checkAuth, logoutUser)
//=====================================================


//=====================================================
//profile routes
//=====================================================
// Get user profile
router.get('/profile', checkAuth, getUserProfile)

//=====================================================


export default router
