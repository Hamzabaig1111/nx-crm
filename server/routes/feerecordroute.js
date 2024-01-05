// Import necessary modules
import express from "express";
import {
  CreateFeeRecord,
  DailySaleEarningData,
  DeleteFeeRecord,
  GetLast24HoursEarningRecord,
  UpdateFeeRecord,
  getAllFeeRecords,
  getFilterReceivableAmountData,
  getSingleFeeRecord,
  getSingleFeeRecordFee,
} from "../controllers/feerecordcontroller.js";

import {
  SuperAdminMiddleware,
  accessMiddlewareForAgentAccountantAdmin,
} from "../middlewares/authmiddleware.js";
import { exportFeeDetailsToExcel } from "../Files/feedetail.js";

// Create an instance of Express router
const router = express.Router();

// Route to handle form submission for feerecord
router.get("/", accessMiddlewareForAgentAccountantAdmin, getAllFeeRecords);
router.get(
  "/single/:feeId",
  accessMiddlewareForAgentAccountantAdmin,
  getSingleFeeRecordFee
);
router.get(
  "/receivablestats",
  accessMiddlewareForAgentAccountantAdmin,
  getFilterReceivableAmountData
);
router.get(
  "/lastdayearning",
  accessMiddlewareForAgentAccountantAdmin,
  GetLast24HoursEarningRecord
);
// Stats to Excel Report here
router.get(
  "/excelexportfeedetail",
  accessMiddlewareForAgentAccountantAdmin,
  exportFeeDetailsToExcel
);
router.get(
  "/:studentId",
  accessMiddlewareForAgentAccountantAdmin,
  getSingleFeeRecord
);

router.get(
  "/dailystats/dsaleearndata",
  accessMiddlewareForAgentAccountantAdmin,
  DailySaleEarningData
);

router.post(
  "/create-fee-record",
  accessMiddlewareForAgentAccountantAdmin,
  CreateFeeRecord
);
router.put("/:feeId", accessMiddlewareForAgentAccountantAdmin, UpdateFeeRecord);
router.delete("/:feeId", SuperAdminMiddleware, DeleteFeeRecord);
// Daily Sale Report here
// Export the router
export default router;
