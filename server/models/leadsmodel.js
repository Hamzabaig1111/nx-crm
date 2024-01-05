import mongoose from "mongoose";
const { Schema } = mongoose;
const leadSchema = new Schema(
  {
    agentId: {
      type: String,
    },
    agent_name: {
      type: String,
    },
    srno: { type: String },
    stdname: {
      type: String,
      // required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    course_interested: {
      type: String,
      required: true,
    },
    source: {
      type: String,
    },
    branchname: {
      type: String,
      required: true,
    },

    reference: String,
    status: {
      type: String,
      required: true,
      enum: [
        "success",
        "pending",
        "visit",
        "future prospect",
        "not interested",
      ],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
