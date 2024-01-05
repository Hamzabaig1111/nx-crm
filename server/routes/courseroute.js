import express from "express";
import {
  CreateCourse,
  CurrentActiveBadges,
  DeleteCourse,
  GetAllCourses,
  GetSingleCourse,
  GetTotalNumberOfCourses,
  UpdateCourse,
  getTotalActiveBatchesWithCurrentStatus,
} from "../controllers/coursecontroller.js";
import {
  SuperAdminMiddleware,
  accessMiddlewareForAgentAccountantAdmin,
  accessMiddlewareForAgentAndSuperAdmin,
} from "../middlewares/authmiddleware.js";
const router = express.Router();

// Route to handle course record form submissions
router.get("/", accessMiddlewareForAgentAccountantAdmin, GetAllCourses);
router.get("/getactivebadges", CurrentActiveBadges);
router.get("/getnumberofcourses", GetTotalNumberOfCourses);
router.get(
  "/getactivebadgeswithstatus",
  accessMiddlewareForAgentAccountantAdmin,
  getTotalActiveBatchesWithCurrentStatus
);
router.get(
  "/single/:courseId",
  accessMiddlewareForAgentAccountantAdmin,
  GetSingleCourse
);
router.post(
  "/createcourse",
  accessMiddlewareForAgentAndSuperAdmin,
  CreateCourse
);
router.put("/:courseId", accessMiddlewareForAgentAndSuperAdmin, UpdateCourse);
router.delete("/:courseId", SuperAdminMiddleware, DeleteCourse);

export default router;
