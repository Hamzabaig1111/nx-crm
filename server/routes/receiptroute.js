import express from "express";
import {
  CreateReceipt,
  DeleteReceipt,
  GetAllReceipts,
  GetSingleReceipt,
  PrintPrecipt,
  UpdateReceipt,
} from "../controllers/receiptcontroller";
import {
  SuperAdminMiddleware,
  accessMiddlewareForAgentAccountantAdmin,
} from "../middlewares/authmiddleware";

const router = express.Router();

// Get all receipts
router.get(
  "/allreceipt",
  accessMiddlewareForAgentAccountantAdmin,
  GetAllReceipts
);
router.get(
  "/:receiptId",
  accessMiddlewareForAgentAccountantAdmin,
  GetSingleReceipt
);
router.post(
  "/generatereceipt",
  accessMiddlewareForAgentAccountantAdmin,
  CreateReceipt
);
router.put(
  "/:receiptId",
  accessMiddlewareForAgentAccountantAdmin,
  UpdateReceipt
);
router.delete(
  "/receiptId",
  accessMiddlewareForAgentAccountantAdmin,
  DeleteReceipt
);
router.get("/print/:receiptId", SuperAdminMiddleware, PrintPrecipt);

export default router;
