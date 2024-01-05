import mongoose from "mongoose";

const { Schema } = mongoose;

const recordSchema = new Schema(
  {
    created_at: {
      type: Date,
      default: Date.now,
    },
    student_name: {
      type: String,
      required: true,
    },
    father_name: {
      type: String,
      required: true,
    },
    CNIC: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    course_interested: {
      type: String,
      required: true,
    },
    course_name: {
      type: String,
      required: true,
    },
    course_category: {
      type: String,
      required: true,
    },
    course_duration: {
      type: String,
      required: true,
    },
    course_fee: {
      type: String,
      required: true,
    },
    received_fee: {
      type: String,
      required: true,
    },
    pending_fee: {
      type: String,
      required: true,
    },
    doadm: {
      type: String,
      required: true,
    },
    agent: {
      type: String,
      required: true,
    },
    feetype: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Record", recordSchema);
