import mongoose from "mongoose";

const { Schema } = mongoose;

const agentRecordSchema = new Schema(
  {
    created_at: {
      type: Date,
      default: Date.now,
    },
    agent_fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userImage: {
      type: String,
      default: null,
    },
    contact: {
      type: String,
      default: null,
    },
    joining_date: {
      type: String,
      default: Date.now,
    },
    success_rate: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    desigination: {
      type: String,
      required: true,
      enum: ["superadmin", "admin", "accountant", "agent"],
    },
    agentBranch: {
      type: String,
      required: true,
      enum: ["Arfa Kareem", "Iqbal Town", "Johar Town"],
    },
    agent_username: {
      type: String,
      required: true,
    },
    is_admin: {
      type: Boolean,
      default: false,
      required: true,
    },
    is_Accountant: {
      type: Boolean,
      default: false,
      required: true,
    },
    is_employee: {
      type: Boolean,
      required: true,
      default: false,
    },
    agentSignatureStamp: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("AgentRecord", agentRecordSchema);
