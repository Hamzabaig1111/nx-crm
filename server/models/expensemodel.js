import mongoose from 'mongoose';

const { Schema } = mongoose;

const expensesRecordSchema = new Schema(
  {
    created_at: {
      type: Date,
      default: Date.now,
    },
    types_of_expenses: {
      type: String,
      required: true,
    },
    expenses_details: {
      type: String,
      required: true,
    },
    agentBranch: {
      type: String,
      required: true,
      enum: ["Arfa Kareem", "Iqbal Town", "Johar Town"],
    },
  },
  { timestamps: true }
);

export default mongoose.model('ExpensesRecord', expensesRecordSchema);
