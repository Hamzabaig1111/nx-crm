import mongoose from "mongoose";

const { Schema } = mongoose;

const otherEarningRecordSchema = new Schema(
  {
    created_at: {
      type: Date,
      default: Date.now,
    },
    name_of_person: {
      type: String,
      required: true,
    },
    contact_detail: {
      type: String,
      required: true,
    },
    types_of_project: {
      type: String,
      required: true,
    },
    project_nature: {
      type: String,
      required: true,
    },
    description_of_project: {
      type: String,
      required: true,
    },
    agentBranch: {
      type: String,
      required: true,
      enum: ["Arfa Kareem", "Iqbal Town", "Johar Town"],
    },
    payment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("OtherEarningRecord", otherEarningRecordSchema);
