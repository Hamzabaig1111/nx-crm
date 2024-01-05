import express from "express";
import multer from "multer";
import exceljs from "exceljs";
import Lead from "../models/leadsmodel.js";
const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
});

router.post("/upload-leads", upload.single("file"), async (req, res) => {
  try {
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.load(req.file.buffer);
    const worksheet = workbook.worksheets[0];
    const leads = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        const [
          name,
          mobile,
          email,
          status,
          course_interested,
          source,
          reference,
        ] = row.values;
        leads.push({
          name,
          mobile,
          email,
          status,
          course_interested,
          source,
          reference,
        });
      }
    });
    await Lead.create(leads);
    return res.status(201).json({ message: "Leads uploaded Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", errorMessage: error.message });
  }
});

export default router;
