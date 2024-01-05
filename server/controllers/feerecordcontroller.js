import { endOfDay, startOfDay, subDays } from "date-fns";
import FeeRecord from "../models/feerecordmodel.js";

export const CreateFeeRecord = async (req, res) => {
  try {
    // Extract form data from the request body
    const {
      user,
      agent_branch,
      studentId,
      std_name,
      std_cnic,
      std_coursename,
      agent_name,
      std_courseduration,
      status,
      std_batch,
      std_feetype,
      total_course_fee,
      fee_on_admission_received,
      no_of_installments,
    } = req.body;

    // Create a new instance of the FeeRecord model
    const newRecord = new FeeRecord({
      user,
      agent_branch,
      studentId,
      std_name,
      std_cnic,
      std_coursename,
      agent_name,
      std_courseduration,
      status,
      std_batch,
      std_feetype,
      total_course_fee,
      fee_on_admission_received,
      no_of_installments,
    });

    // Save the record to the database
    const savedRecord = await newRecord.save();

    // Respond with a success message or the saved record
    res.status(201).json(savedRecord);
  } catch (error) {
    // Handle errors
    console.error("Error submitting feerecord:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errorMessage: error.message });
  }
};

// Get all fee records
export const getAllFeeRecords = async (req, res) => {
  try {
    let query = {};
    if (req.query.month) {
      query.date = { $regex: new RegExp(req.query.month, "i") };
    }
    if (req.query.status) {
      query.status = req.query.status;
    }
    if (req.query.date) {
      query.date = {
        $gte: req.query.date + "-01",
        $lte: req.query.date + "-31",
      };
    }
    const feeRecords = await FeeRecord.find(query);
    res.status(200).json(feeRecords);
  } catch (error) {
    console.error("Error getting fee records:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a specific fee record by ID
export const getSingleFeeRecord = async (req, res) => {
  try {
    const studentId = req.params.studentId; // Assuming the parameter is named studentId
    const feeRecord = await FeeRecord.findOne({ studentId });
    if (!feeRecord) {
      return res
        .status(404)
        .json({ error: "Fee record not found for the specified studentId" });
    }
    res.status(200).json(feeRecord);
  } catch (error) {
    console.error("Error getting fee record by studentId:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a fee record by ID
export const UpdateFeeRecord = async (req, res) => {
  try {
    const updatedFeeRecord = await FeeRecord.findByIdAndUpdate(
      req.params.feeId,
      req.body,
      { new: true }
    );
    if (!updatedFeeRecord) {
      return res.status(404).json({ error: "Fee record not found" });
    }
    res.status(200).json(updatedFeeRecord);
  } catch (error) {
    console.error("Error updating fee record by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a fee record by ID
export const DeleteFeeRecord = async (req, res) => {
  try {
    const deletedFeeRecord = await FeeRecord.findByIdAndDelete(
      req.params.feeId
    );
    if (!deletedFeeRecord) {
      return res.status(404).json({ error: "Fee record not found" });
    }
    res.status(200).json(deletedFeeRecord);
  } catch (error) {
    console.error("Error deleting fee record by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const convertMonthNameToNumber = (monthName) => {
  const monthsMap = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  return monthsMap[monthName];
};

// Your existing getFilterReceivedableAmountData function

export const getSingleFeeRecordFee = async (req, res) => {
  try {
    const feeId = req.params.feeId;
    const feeRecord = await FeeRecord.findById(feeId);
    if (!feeRecord) {
      return res.status(404).json({ error: "Fee record Found with this ID" });
    }
    res.status(200).json(feeRecord);
  } catch (error) {
    console.error("Error getting fee record by studentId:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const GetLast24HoursEarningRecord = async (req, res) => {
  try {
    // Calculate the start and end of the day for the last 24 hours
    const currentDate = new Date();
    const startDate = subDays(startOfDay(currentDate), 1);
    const endDate = endOfDay(currentDate);

    // Aggregate to get the sum of earnings in the last 24 hours
    const result = await FeeRecord.aggregate([
      {
        $match: {
          created_at: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: "$updated_received_fee" },
        },
      },
    ]);

    // If there are no records, return 0
    const totalEarnings = result.length > 0 ? result[0].totalEarnings : 0;

    res.status(200).json({ totalEarnings });
  } catch (error) {
    console.error("Error getting last 24 hours earnings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Exprot funciton
export const getFilterReceivableAmountData = async (req, res) => {
  try {
    const { month } = req.query;
    // Here is month
    // Define the match object for filtering by month
    const match = month
      ? {
          $expr: {
            $eq: [
              { $month: "$created_at" },
              parseInt(month, 10), // Convert month to integer
            ],
          },
        }
      : {};

    const aggregationPipeline = [
      { $match: match },
      {
        $project: {
          _id: 1,
          std_name: 1,
          agent_name: 1,
          no_of_installments: 1,
          next_installments: 1,
          updated_received_fee: 1,
          total_course_fee: 1,
          std_courseduration: 1,
          std_batch: 1,
          std_coursename: 1,
          remaining_fee: 1,
          updated_receivable_fee: 1,
        },
      },
      {
        $addFields: {
          installments: {
            $filter: {
              input: "$next_installments",
              as: "installment",
              cond: {
                $eq: ["$$installment.status", "unpaid"],
              },
            },
          },
        },
      },
    ];

    const studentDetails = await FeeRecord.aggregate(aggregationPipeline);

    const totalReceivableFee = studentDetails.reduce(
      (sum, student) => sum + student.updated_receivable_fee,
      0
    );

    res.json({
      studentDetails,
      totalReceivableFee,
    });
  } catch (error) {
    console.error("Error in getFilterReceivableAmountData:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Daily Earning Functionality
export const DailySaleEarningData = async (req, res) => {
  try {
    // Calculate the start and end of the day for the current date
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    const result = await FeeRecord.aggregate([
      {
        $match: {
          created_at: { $gte: todayStart, $lte: todayEnd },
        },
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: "$total_course_fee" },
          totalUpdatedReceivedFee: { $sum: "$updated_received_fee" },
          records: {
            $push: {
              _id: "$_id",
              studentId: "$studentId",
              std_name: "$std_name",
              std_coursename: "$std_coursename",
              agent_name: "$agent_name",
              status: "$status",
              total_course_fee: "$total_course_fee",
              updated_no_of_installments: "$updated_no_of_installments",
              updated_receivable_fee: "$updated_receivable_fee",
              std_courseduration: "$std_courseduration",
              updated_received_fee: "$updated_received_fee",
              std_batch: "$std_batch",
              created_at: {
                $dateToString: { format: "%Y-%m-%d", date: "$created_at" },
              },
            },
          },
        },
      },
    ]);

    const totalEarnings = result.length > 0 ? result[0].totalEarnings : 0;
    const totalUpdatedReceivedFee =
      result.length > 0 ? result[0].totalUpdatedReceivedFee : 0;
    const feeRecords = result.length > 0 ? result[0].records : [];
    res
      .status(200)
      .json({ feeRecords, totalEarnings, totalUpdatedReceivedFee });
  } catch (error) {
    console.error("Error fetching daily sale and earning data:", error);

    // Send an error response
    res
      .status(500)
      .json({ error: "Internal Server Error fee", errormsg: error.message });
  }
};
