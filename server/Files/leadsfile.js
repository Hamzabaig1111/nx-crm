import ExcelJS from "exceljs";
import Lead from '../models/leadsmodel.js'

export const exportLeadsToExcel = async (req, res) => {
  try {
    const data = await Lead.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    // Add headers
    const headers = Object.keys(data[0]._doc);
    worksheet.addRow(headers);

    // Add data rows
    data.forEach((item) => {
      const row = [];
      headers.forEach((header) => {
        row.push(item[header]);
      });
      worksheet.addRow(row);
    });

    // Set content type and disposition including the file name
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=exported-leads.xlsx"
    );

    // Write the workbook to the response
    workbook.xlsx.write(res).then(() => {
      res.end();
    });
  } catch (error) {
    console.error("Error exporting leads to Excel:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
