// routes/exportRoute.js
import express from "express";
import { GetAgentstoExcel } from "../controllers/agentfilecontroller.js";
const router = express.Router();

router.get("/export-agents-to-excel", GetAgentstoExcel);

export default router;
