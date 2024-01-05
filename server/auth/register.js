import express from "express";
import { Logout, UserLogin, UserRegister } from "../controllers/authController.js";

const router = express.Router();

// Route for user registration
router.post("/register", UserRegister);
router.post("/login", UserLogin);
router.get("/logout", Logout);
// Route for Login Process

export default router;
