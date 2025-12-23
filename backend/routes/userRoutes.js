//userRoutes.js
import express from 'express'
import {
  registerUser,
  loginUser,
  logoutUser,
  requestPasswordReset,
  verifyResetToken,
  resetPassword,
} from '../controllers/authController.js'

import { getUserProfile, editProfile } from '../controllers/profileController.js'
import {
  getAllUsers,
  getUserById,
  editUserById,
  deleteUserById,
  createAdminCinema,
} from '../controllers/userController.js'
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
// request password reset token
router.post('/request-password-reset', requestPasswordReset)
//reset password route

router.post('/reset-password', resetPassword)
//verify reset password token
router.post('/verify-reset-token', verifyResetToken)

//=====================================================

//=====================================================
//profile routes
//=====================================================
// Get user profile
router.get('/profile', checkAuth, getUserProfile)
//edit profile
router.put('/profile', checkAuth, editProfile)
//=====================================================

//=====================================================
//admin user management routes superAdmin only
//=====================================================
//Get all users
router.get('/admin/users', checkAuth, checkSuperAdmin, getAllUsers)
//Get user by id
router.get('/admin/users/:id', checkAuth, checkSuperAdmin, getUserById)
//Edit user by id
router.put('/admin/users/:id', checkAuth, checkSuperAdmin, editUserById)
//Delete user by id
router.delete('/admin/users/:id', checkAuth, checkSuperAdmin, deleteUserById)
//create admin cinema
router.post('/admin/users', checkAuth, checkSuperAdmin, createAdminCinema)
//=====================================================

export default router
