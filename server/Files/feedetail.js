import ExcelJS from "exceljs";
import FeeRecord from "../models/feerecordmodel.js"

export const exportFeeDetailsToExcel = async (req, res) => {
  try {
    let query = {};

    if (req.query.currentMonth) {
      const currentMonth = req.query.currentMonth;
      const monthNumber = convertMonthNameToNumber(currentMonth);

      query = {
        ...query,
        installment_dates: {
          $elemMatch: {
            month: currentMonth,
          },
        },
      };
    }

    const data = await FeeRecord.aggregate([
      {
        $match: {
          remaining_installments: { $gt: 0 },
          ...query, // Add the month filter to the query
        },
      },
      {
        $project: {
          _id: 1,
          std_name: 1,
          agent_name: 1,
          next_installment_due: 1,
          remaining_installments: 1,
          installment_dates: 1,
          std_receiveablefee: 1,
          std_coursename: 1,
          std_batch: 1,
          std_courseduration: 1,
          std_payment: 1,
          std_receivedfee: 1,
        },
      },
      {
        $group: {
          _id: null,
          totalReceiveableFee: { $sum: "$std_receiveablefee" },
          students: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          totalReceiveableFee: 1,
          students: 1,
        },
      },
    ]);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Fee Details");

    // Add headers
    const headers = Object.keys(data[0].students[0]);
    worksheet.addRow(headers);

    // Add data rows
    data[0].students.forEach((item) => {
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
      "attachment; filename=exported-fee-details.xlsx"
    );

    // Write the workbook to the response
    workbook.xlsx.write(res).then(() => {
      res.end();
    });
  } catch (error) {
    console.error("Error exporting fee details to Excel:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
