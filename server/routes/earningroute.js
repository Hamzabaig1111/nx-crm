import express from "express";
import {
  CreateEarning,
  DeleteEarning,
  GetAllEarning,
  GetSingleEarning,
  UpdateEarning,
} from "../controllers/earningcontroller.js";
import {
  SuperAdminMiddleware,
  accessMiddlewareForAgentAccountantAdmin,
  accessMiddlewareForAgentAndSuperAdmin,
} from "../middlewares/authmiddleware.js";

const router = express.Router();

// Route to handle form submission
router.get("/", accessMiddlewareForAgentAccountantAdmin, GetAllEarning);
router.get(
  "/:earningId",
  accessMiddlewareForAgentAccountantAdmin,
  GetSingleEarning
);
router.post(
  "/submit-other-earning",
  accessMiddlewareForAgentAndSuperAdmin,
  CreateEarning
);
router.put("/:earningId", accessMiddlewareForAgentAndSuperAdmin, UpdateEarning);
router.delete("/:earningId", SuperAdminMiddleware, DeleteEarning);

export default router;
