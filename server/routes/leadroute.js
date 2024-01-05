// Import necessary modules
import express from "express";
import {
  CreateLead,
  DeleteLead,
  GetSingleLead,
  UpdateLead,
  getAgentCounts,
  getAllLeads,
  getCurrentAgentLeads,
} from "../controllers/leadcontroller.js";
import { Readable, Stream } from "stream"; // Use import for ES6 modules
import multer from "multer";
import Lead from "../models/leadsmodel.js";
import csv from "csv-parser";
import {
  SuperAdminMiddleware,
  accessMiddlewareForAgentAccountantAdmin,
  accessMiddlewareForAgentAndSuperAdmin,
} from "../middlewares/authmiddleware.js";
import { exportLeadsToExcel } from "../Files/leadsfile.js";
// Create an instance of Express router
const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
});

// Route to handle form submission for lead
router.get("/", accessMiddlewareForAgentAndSuperAdmin, getAllLeads);
router.get(
  "/getleadsexports",
  accessMiddlewareForAgentAccountantAdmin,
  exportLeadsToExcel
);
router.get("/getagentsstatdata", getAgentCounts);
router.get("/:leadId", accessMiddlewareForAgentAndSuperAdmin, GetSingleLead);
router.post("/createlead", accessMiddlewareForAgentAndSuperAdmin, CreateLead);
router.put("/:leadId", accessMiddlewareForAgentAccountantAdmin, UpdateLead);
router.delete("/:leadId", SuperAdminMiddleware, DeleteLead);
router.get(
  "/single/:agentId",
  accessMiddlewareForAgentAndSuperAdmin,
  getCurrentAgentLeads
);
router.post(
  "/singlefile/upload",
  accessMiddlewareForAgentAndSuperAdmin,
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "No file uploaded" });
      }

      const results = [];
      const fileBuffer = req.file.buffer.toString("utf8");
      const agentId = req.body.agentId;
      const branchname = req.body.branchname;
      const agent_name = req.body.agent_name;
      const readableStream = Stream.Readable.from(fileBuffer.split("\n"));
      const csvParser = csv();

      await new Promise((resolve, reject) => {
        readableStream
          .pipe(csvParser)
          .on("data", (data) => {
            // Append agentId to each object before pushing to results
            data.agentId = agentId;
            data.branchname = branchname;
            data.agent_name = agent_name;
            if (data.status) {
              data.status = data.status.toLowerCase();
            }
            results.push(data);
            console.log(data);
          })
          .on("end", resolve)
          .on("error", reject);
      });

      await Lead.insertMany(results);

      res.status(200).json({
        success: true,
        message: "Lead data successfully uploaded",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error processing file or saving data to Lead model",
        errormsg: error.message,
      });
    }
  }
);

export default router;
