import express from "express";
import {
  CreateAdmission,
  DeleteAdmission,
  GetAllAdmissoinRecords,
  GetAllStudentBatchInroll,
  GetSingleAdmission,
  GetStudentsRegisteredLast24Hours,
  UpdateAdmission,
} from "../controllers/admissoincontroller.js";
import {
  SuperAdminMiddleware,
  accessMiddlewareForAgentAccountantAdmin,
  accessMiddlewareForAgentAndSuperAdmin,
} from "../middlewares/authmiddleware.js";

const router = express.Router();

// Route to handle admission record form submissions
router.get("/", accessMiddlewareForAgentAccountantAdmin, GetAllAdmissoinRecords);
router.get("/getstudentswithbatchs", GetAllStudentBatchInroll);
router.get("/dlrs",accessMiddlewareForAgentAccountantAdmin, GetStudentsRegisteredLast24Hours);
router.post(
  "/createadmission",
  accessMiddlewareForAgentAndSuperAdmin,
  CreateAdmission
);
router.get(
  "/:admissionId",
  accessMiddlewareForAgentAccountantAdmin,
  GetSingleAdmission
);
router.put(
  "/:admissionId",
  accessMiddlewareForAgentAndSuperAdmin,
  UpdateAdmission
);
router.delete("/:admissionId", SuperAdminMiddleware, DeleteAdmission);

export default router;
