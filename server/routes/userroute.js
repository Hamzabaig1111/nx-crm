import express from "express";
import {
  CreateNewUser,
  DeleteUser,
  GetAllUsers,
  GetSingleUser,
  UpdateUser,
} from "../controllers/userController.js";
import { SuperAdminMiddleware } from "../middlewares/authmiddleware.js";

const router = express.Router();

// Route to get user data
router.get("/", SuperAdminMiddleware, GetAllUsers);
router.get("/:userId", SuperAdminMiddleware, GetSingleUser);
router.post("/create-new-user", SuperAdminMiddleware, CreateNewUser);
router.put("/:userId", SuperAdminMiddleware, UpdateUser);
router.delete("/:userId", SuperAdminMiddleware, DeleteUser);

export default router;
