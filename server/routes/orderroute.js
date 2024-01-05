// Import necessary modules
import express from "express";
import {
  CreateOrder,
  DeleteOrder,
  GetAllOrders,
  GetRecentProjectsRecord,
  GetSingleOrder,
  GetTotalNumberofOrders,
  UpdateOrder,
} from "../controllers/ordercontroller.js";
import {
  SuperAdminMiddleware,
  accessMiddlewareForAgentAccountantAdmin,
} from "../middlewares/authmiddleware.js";

// Create an instance of Express router
const router = express.Router();

// Route to handle form submission for orders
router.get("/", accessMiddlewareForAgentAccountantAdmin, GetAllOrders);
router.get(
  "/ordersstatuscount",
  accessMiddlewareForAgentAccountantAdmin,
  GetTotalNumberofOrders
);
router.get(
  "/recentsorders",
  accessMiddlewareForAgentAccountantAdmin,
  GetRecentProjectsRecord
);
router.get(
  "/:orderId",
  accessMiddlewareForAgentAccountantAdmin,
  GetSingleOrder
);
router.post(
  "/submit-order",
  accessMiddlewareForAgentAccountantAdmin,
  CreateOrder
);
router.put("/:orderId", accessMiddlewareForAgentAccountantAdmin, UpdateOrder);
router.delete("/:orderId", SuperAdminMiddleware, DeleteOrder);

// Export the router
export default router;
