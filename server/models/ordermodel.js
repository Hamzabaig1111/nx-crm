import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    created_at: {
      type: Date,
      default: Date.now,
    },
    customer_name: {
      type: String,
      required: true,
    },
    customer_email: {
      type: String,
      required: true,
    },
    project_category: {
      type: String,
      required: true,
    },
    project_description: {
      type: String,
      required: true,
    },
    project_duration: {
      type: String,
      required: true,
    },
    project_price: {
      type: String,
      default: null,
    },
    expected_completion_date: {
      type: String,
      default: null,
    },
    project_status: {
      type: String,
      enum: ["Pending", "Inprogress", "Delivered"],
      default: "Pending",
    },
    agentBranch: {
      type: String,
      required: true,
      enum: ["Arfa Kareem", "Iqbal Town", "Johar Town"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
