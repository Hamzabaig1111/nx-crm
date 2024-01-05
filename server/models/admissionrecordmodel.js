import mongoose from "mongoose";

const { Schema } = mongoose;

const admissionRecordSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "AgentRecord", // Reference to the Agent model
      required: true,
    },
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
    status: {
      type: String,
      enum: ["Paid", "Installment"],
      default: "Unpaid",
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "1",
    },
    address: {
      type: String,
      required: true,
    },
    city: {
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
      type: Number,
      required: true,
    },
    received_fee: {
      type: Number,
      required: true,
    },
    cminstallment: {
      type: Number,
    },
    updatedreceived: {
      type: Number,
    },
    updatedpayable: {
      type: Number,
    },
    installment: {
      type: Boolean,
      default: false,
    },
    num_installments: {
      type: Number,
    },
    updatednoofinstallments: {
      type: Number,
    },
    pending_fee: {
      type: Number,
    },
    doe: {
      type: String,
      required: true,
      default: Date.now,
    },
    agent: {
      type: String,
      required: true,
    },
    std_batch: {
      type: String,
    },
    zipcode: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
    },
    additionalNote: {
      type: String,
      required: true,
    },
    student_card_fee: {
      type: Number,
      required: true,
    },
    std_feetype: {
      type: String,
      required: true,
      enum: ["cash", "banktransfer"],
    },
    agentBranch: {
      type: String,
      required: true,
      enum: ["Arfa Kareem", "Iqbal Town", "Johar Town"],
    },
    card_status: {
      type: "String",
      default: "pending",
      enum: ["pending", "applied"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("AdmissionRecord", admissionRecordSchema);
