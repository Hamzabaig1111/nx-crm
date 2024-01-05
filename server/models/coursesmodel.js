import mongoose from "mongoose";

const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    course_name: {
      type: String,
      required: true,
    },
    course_cat: {
      type: String,
      required: true,
    },
    Batch: {
      type: String,
      default: null,
    },
    instructor_name: {
      type: String,
      required: true,
    },
    course_duration: {
      type: String,
      required: true,
    },
    no_of_classes_in_week: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["inprogress", "will_beStart", "completed"],
      default: "inprogress",
    },
    agentBranch: {
      type: String,
      required: true,
      enum: ["Arfa Kareem", "Iqbal Town", "Johar Town"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("CourseRecord", courseSchema);
