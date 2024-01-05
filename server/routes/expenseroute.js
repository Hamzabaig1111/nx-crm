import express from "express";
import {
  CreateExpense,
  DeleteExpense,
  getAllExpenses,
  getSingleExpense,
  updateExpense,
} from "../controllers/expenseController.js";
import {
  SuperAdminMiddleware,
  accessMiddlewareForAccountantAndSuperAdmin,
} from "../middlewares/authmiddleware.js";
const router = express.Router();

// Route to handle form submission for expenses_record
router.get(
  "/:expenseId",
  accessMiddlewareForAccountantAndSuperAdmin,
  getSingleExpense
);
router.get("/", accessMiddlewareForAccountantAndSuperAdmin, getAllExpenses);
router.post(
  "/create-expense",
  accessMiddlewareForAccountantAndSuperAdmin,
  CreateExpense
);
router.put("/:expenseId", SuperAdminMiddleware, updateExpense);
router.delete("/:expenseId", SuperAdminMiddleware, DeleteExpense);

export default router;
