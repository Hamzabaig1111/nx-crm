import mongoose from "mongoose";

const { Schema } = mongoose;
// Admin can only created users
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userImage: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
    is_Accountant: {
      type: Boolean,
      default: false,
    },
    is_employee: {
      type: Boolean,
      default: false,
    },
    contact: {
      type: String,
      default: null,
    },
    joining_date: {
      type: String,
      default: null,
    },
    success_rate: {
      type: String,
      default: null,
    },
    image: {
      type: String, // Assuming you store the image URL
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
