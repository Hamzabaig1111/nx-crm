import User from "../models/usermodel.js";
import bcrypt from "bcrypt";
export const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Exclude password field from the response
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a specific user by ID
export const GetSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId, { password: 0 }); // Exclude password field from the response
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error getting user by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new user
export const CreateNewUser = async (req, res) => {
  try {
    const userdata = req.body;
    const { password } = userdata;
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      ...userdata,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errorMessage: error.message });
  }
};

// Update a user by ID
export const UpdateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const DeleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(deletedUser);
  } catch (error) {
    console.error("Error deleting user by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
