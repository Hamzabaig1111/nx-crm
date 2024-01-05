import ExpensesRecord from "../models/expensemodel.js";

export const CreateExpense = async (req, res) => {
  try {
    // Extract form data from the request body
    const { types_of_expenses, expenses_details } = req.body;

    // Create a new instance of the ExpensesRecord model
    const newRecord = new ExpensesRecord({
      types_of_expenses,
      expenses_details,
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

// Get all expense records
export const getAllExpenses = async (req, res) => {
  try {
    const expenseRecords = await ExpensesRecord.find();
    res.json(expenseRecords);
  } catch (error) {
    console.error("Error getting expense records:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a specific expense record by ID
export const getSingleExpense = async (req, res) => {
  try {
    const expenseRecord = await ExpensesRecord.findById(req.params.id);
    if (!expenseRecord) {
      return res.status(404).json({ error: "Expense record not found" });
    }
    res.json(expenseRecord);
  } catch (error) {
    console.error("Error getting expense record by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an expense record by ID
export const updateExpense = async (req, res) => {
  try {
    const updatedExpenseRecord = await ExpensesRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedExpenseRecord) {
      return res.status(404).json({ error: "Expense record not found" });
    }
    res.json(updatedExpenseRecord);
  } catch (error) {
    console.error("Error updating expense record by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete an expense record by ID
export const DeleteExpense = async (req, res) => {
  try {
    const deletedExpenseRecord = await ExpensesRecord.findByIdAndDelete(
      req.params.id
    );
    if (!deletedExpenseRecord) {
      return res.status(404).json({ error: "Expense record not found" });
    }
    res.json(deletedExpenseRecord);
  } catch (error) {
    console.error("Error deleting expense record by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
