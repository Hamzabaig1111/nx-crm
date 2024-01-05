import OtherEarningRecord from "../models/earningmodel.js";
export const CreateEarning = async (req, res) => {
  try {
    // Extract form data from the request body
    const {
      name_of_person,
      contact_detail,
      types_of_project,
      project_nature,
      description_of_project,
      payment,
    } = req.body;

    // Create a new instance of the OtherEarningRecord model
    const newRecord = new OtherEarningRecord({
      name_of_person,
      contact_detail,
      types_of_project,
      project_nature,
      description_of_project,
      payment,
    });

    // Save the record to the database
    const savedRecord = await newRecord.save();

    // Respond with a success message or the saved record
    res.status(201).json(savedRecord);
  } catch (error) {
    // Handle errors
    console.error("Error submitting form:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all earning records
export const GetAllEarning = async (req, res) => {
  try {
    const earningRecords = await OtherEarningRecord.find();
    res.json(earningRecords);
  } catch (error) {
    console.error("Error getting earning records:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a specific earning record by ID
export const GetSingleEarning = async (req, res) => {
  try {
    const earningRecord = await OtherEarningRecord.findById(req.params.earningId);
    if (!earningRecord) {
      return res.status(404).json({ error: "Earning record not found" });
    }
    res.json(earningRecord);
  } catch (error) {
    console.error("Error getting earning record by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an earning record by ID
export const UpdateEarning = async (req, res) => {
  try {
    const updatedEarningRecord = await OtherEarningRecord.findByIdAndUpdate(
      req.params.earningId,
      req.body,
      { new: true }
    );
    if (!updatedEarningRecord) {
      return res.status(404).json({ error: "Earning record not found" });
    }
    res.json(updatedEarningRecord);
  } catch (error) {
    console.error("Error updating earning record by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete an earning record by ID
export const DeleteEarning = async (req, res) => {
  try {
    const deletedEarningRecord = await OtherEarningRecord.findByIdAndDelete(
      req.params.earningId
    );
    if (!deletedEarningRecord) {
      return res.status(404).json({ error: "Earning record not found" });
    }
    res.json(deletedEarningRecord);
  } catch (error) {
    console.error("Error deleting earning record by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
