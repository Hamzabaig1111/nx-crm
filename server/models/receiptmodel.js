import mongoose from "mongoose";

const { Schema } = mongoose;

const receiptSchema = new Schema(
  {
    student_name: {
      type: String,
      required: true,
    },
    cnic: {
      type: String,
      required: true,
    },
    f_name: {
      type: String,
      required: true,
    },
    mobile_no: {
      type: String,
      required: true,
    },
    course_enrolled: {
      type: String,
      required: true,
    },
    course_duration: {
      type: String,
      required: true,
    },
    agent_name: {
      type: String,
      required: true,
    },
    agent_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Receipt", receiptSchema);
