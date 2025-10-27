//userRoutes.js
import express from "express";
import { registerUser, loginUser, logoutUser} from "../controllers/authController.js";

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
// belum bisa cek admin sementara ini
router.post("/login", loginUser);

// Logout route
router.post("/logout", logoutUser);

export default router;