import Receipt from "../models/receiptmodel.js";

// Get All Receipts
export const GetAllReceipts = async (req, res) => {
  try {
    const receipts = await Receipt.find();
    res.json(receipts);
  } catch (error) {
    console.error("Error getting receipts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Single Receipt

export const GetSingleReceipt = async (req, res, next) => {
  try {
    const receipt = await Receipt.findById(req.params.id);
    if (!receipt) {
      return res.status(404).json({ error: "Receipt not found" });
    }
    res.json(receipt);
  } catch (error) {
    console.error("Error getting receipt by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new receipt
export const CreateReceipt = async (req, res, next) => {
  try {
    const newReceipt = await Receipt.create(req.body);
    res.status(201).json(newReceipt);
  } catch (error) {
    console.error("Error creating receipt:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a receipt by ID
export const UpdateReceipt = async (req, res) => {
  try {
    const updatedReceipt = await Receipt.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedReceipt) {
      return res.status(404).json({ error: "Receipt not found" });
    }
    res.json(updatedReceipt);
  } catch (error) {
    console.error("Error updating receipt by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a receipt by ID
export const DeleteReceipt = async (req, res) => {
  try {
    const deletedReceipt = await Receipt.findByIdAndDelete(req.params.id);
    if (!deletedReceipt) {
      return res.status(404).json({ error: "Receipt not found" });
    }
    res.status(200).json(deletedReceipt);
  } catch (error) {
    console.error("Error deleting receipt by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const PrintPrecipt = async (req, res, next) => {
  try {
    const receipt = await Receipt.findById(req.params.id);

    if (!receipt) {
      return res.status(404).json({ error: "Receipt not found" });
    }

    // Customize this part to format the receipt content as you need
    const printableContent = `
      <h1>Receipt</h1>
      <p>Student Name: ${receipt.student_name}</p>
      <p>CNIC: ${receipt.cnic}</p>
      <p>Father's Name: ${receipt.f_name}</p>
      <p>Mobile No: ${receipt.mobile_no}</p>
      <p>Course Enrolled: ${receipt.course_enrolled}</p>
      <p>Course Duration: ${receipt.course_duration}</p>
      <p>Agent Name: ${receipt.agent_name}</p>
      <p>Agent ID: ${receipt.agent_id}</p>
      <!-- Add more details as needed -->
    `;

    // Respond with the printable content (you can use a template engine for better structure)
    res.status(200).send(printableContent);
  } catch (error) {
    res.status(500).json(error);
  }
};
