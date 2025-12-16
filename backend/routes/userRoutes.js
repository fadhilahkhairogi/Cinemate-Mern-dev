//userRoutes.js
import express from 'express'
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js'
import { getUserProfile, editProfile, getAllUsers } from '../controllers/profileController.js'
import { checkAuth } from '../middleware/checkAuth.js'
import { checkSuperAdmin } from '../middleware/adminMiddleware.js'

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
//edit profile
router.put('/profile', checkAuth, editProfile)
//Get all users (admin only)
router.get('/all-users', checkAuth, checkSuperAdmin, getAllUsers)
//=====================================================


export default router
