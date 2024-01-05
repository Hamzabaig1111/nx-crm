import AdmissionRecord from "../models/admissionrecordmodel.js";
import { startOfDay, endOfDay, subDays } from "date-fns";

export const CreateAdmission = async (req, res) => {
  try {
    const admissionData = req.body; // Assuming you send the form data in the request body

    // Create a new AdmissionRecord instance
    const admissionRecord = new AdmissionRecord(admissionData);

    // Save the record to the database
    await admissionRecord.save();
    res
      .status(201)
      .json({ message: "Admission record submitted successfully",admissionRecord });
  } catch (error) {
    console.error("Error submitting admission record:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
};

// Get all admission records
export const GetAllAdmissoinRecords = async (req, res) => {
  try {
    let query = {}; // Initial query

    // Check if specific search parameters are present in req.query
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Check if CNIC is present in req.query
    if (req.query.cnic) {
      query.CNIC = req.query.cnic;
    }

    const admissionRecords = await AdmissionRecord.find(query);

    if (admissionRecords.length === 0) {
      // No records found
      return res.status(404).json({ message: "No matching records found" });
    }

    res.status(200).json(admissionRecords);
  } catch (error) {
    console.error("Error getting admission records:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a specific admission record by ID
export const GetSingleAdmission = async (req, res) => {
  try {
    const admissionRecord = await AdmissionRecord.findById(
      req.params.admissionId
    );
    if (!admissionRecord) {
      return res.status(404).json({ error: "Admission record not found" });
    }
    res.status(200).json(admissionRecord);
  } catch (error) {
    console.error("Error getting admission record by ID:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errormsg: error.message });
  }
};
// Update an admission record by ID
export const UpdateAdmission = async (req, res) => {
  try {
    const updatedAdmissionRecord = await AdmissionRecord.findByIdAndUpdate(
      req.params.admissionId,
      req.body,
      { new: true }
    );
    if (!updatedAdmissionRecord) {
      return res.status(404).json({ error: "Admission record not found" });
    }
    res.status(200).json(updatedAdmissionRecord);
  } catch (error) {
    console.error("Error updating admission record by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete an admission record by ID
export const DeleteAdmission = async (req, res) => {
  try {
    const deletedAdmissionRecord = await AdmissionRecord.findByIdAndDelete(
      req.params.admissionId
    );
    if (!deletedAdmissionRecord) {
      return res.status(404).json({ error: "Admission record not found" });
    }
    res.status(200).json(deletedAdmissionRecord);
  } catch (error) {
    console.error("Error deleting admission record by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// admissionRecordController.js

// Function to get all students enrolled in a specific batch
export const GetAllStudentBatchInroll = async (req, res) => {
  try {
    const { batchName } = req.query;

    // Query to filter students based on batch name
    const studentsInBatch = await AdmissionRecord.find({
      std_batch: batchName,
    });

    res.status(200).json({ students: studentsInBatch });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      errorMessage: error.message,
    });
  }
};

export const GetStudentsRegisteredLast24Hours = async (req, res) => {
  try {
    // Calculate the start and end of the day for the last 24 hours
    const currentDate = new Date();
    const startDate = subDays(startOfDay(currentDate), 1);
    const endDate = endOfDay(currentDate);

    // Aggregate to get the count of students registered in the last 24 hours
    const result = await AdmissionRecord.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]);

    // If there are no records, return 0
    const count = result.length > 0 ? result[0].count : 0;

    res.status(200).json({ count });
  } catch (error) {
    console.error(
      "Error getting students registered in the last 24 hours:",
      error
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};
