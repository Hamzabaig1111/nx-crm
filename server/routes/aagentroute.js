import express from "express";
import {
  CreateAagent,
  DeleteAagent,
  GetAgentsNames,
  GetAllAgents,
  GetDailyEarningsArfaKareem,
  GetDailyEarningsIqbalTown,
  GetDailyEarningsJoharTown,
  GetSingleAgent,
  GetTotalNumberOfAagents,
  UpdateAgent,
} from "../controllers/aagentcontroller.js";
import {
  SuperAdminMiddleware,
  accessMiddlewareForAgentAccountantAdmin,
} from "../middlewares/authmiddleware.js";
import { GetAgentstoExcel } from "../controllers/agentfilecontroller.js";

const router = express.Router();

// Create a New Aagent
router.get("/", SuperAdminMiddleware, GetAllAgents);
router.get("/getagentsnames", GetAgentsNames);
router.get(
  "/getagentstoexcel",
  accessMiddlewareForAgentAccountantAdmin,
  GetAgentstoExcel
);
router.get("/getagentcount", GetTotalNumberOfAagents);
router.get(
  "/:agentId",
  accessMiddlewareForAgentAccountantAdmin,
  GetSingleAgent
);
// Start From Here
// Add routes for daily earnings of each branch
router.get(
  "/branchearning/dailyEarningsArfaKareem",
  accessMiddlewareForAgentAccountantAdmin,
  GetDailyEarningsArfaKareem
);
router.get(
  "/branchearning/dailyEarningsIqbalTown",
  accessMiddlewareForAgentAccountantAdmin,
  GetDailyEarningsIqbalTown
);
router.get(
  "/branchearning/dailyEarningsJoharTown",
  accessMiddlewareForAgentAccountantAdmin,
  GetDailyEarningsJoharTown
);

router.post(
  "/createagent",
  // accessMiddlewareForAgentAccountantAdmin,
  CreateAagent
);
router.put("/:agentId", SuperAdminMiddleware, UpdateAgent);
router.delete("/:agentId", SuperAdminMiddleware, DeleteAagent);

export default router;
