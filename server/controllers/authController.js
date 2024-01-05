import bcrypt from "bcrypt";
import Agent from "../models/aagentmodel.js";
import jwt from "jsonwebtoken";
import { trusted } from "mongoose";
// Route for user registration
export const UserRegister = async (req, res) => {
  try {
    const {
      joining_date,
      email,
      agent_username,
      contact,
      created_at,
      agent_fullName,
      userImage,
      success_rate,
      agentBranch,
      is_admin,
      is_Accountant,
      is_employee,
      password,
    } = req.body;

    // Check if the user already exists
    const existingUser = await Agent.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newAgent = new Agent({
      agent_username,
      email,
      contact,
      joining_date,
      created_at,
      agent_fullName,
      userImage,
      success_rate,
      agentBranch,
      is_admin,
      is_Accountant,
      is_employee,
      password: hashedPassword,
    });

    // Save the user to the database
    await newAgent.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// User Login Here

export const UserLogin = async (req, res) => {
  let token; // Declare the token variable
  try {
    const { agent_username, password } = req.body;

    // Find user by agent_username
    const user = await Agent.findOne({ agent_username });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare hashed passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Password didn't match" });
    }
    // Generate JWT token
    token = jwt.sign(
      {
        agent_username: user.agent_username,
        is_superadmin: user.is_admin,
        is_employee: user.is_employee,
        is_Accountant: user.is_Accountant,
        agentBranch: user.agentBranch,
        desigination: user.desigination,
        branchname: user.agentBranch,
      },
      "8923r4u9832u423iu",
      { expiresIn: "1h" }
    );

    res
      .cookie("lInfo", token, {
        secure: true, // Set the Secure flag for HTTPS
        sameSite: "None", // Expire token in just one hour
        maxAge: 1 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        token: token,
        agentusename: agent_username,
        userImage: user.userImage,
        userId: user._id,
        is_superadmin: user.is_admin,
        is_employee: user.is_employee,
        is_Accountant: user.is_Accountant,
        agentBranch: user.agentBranch,
        desigination: user.desigination,
        branchname: user.agentBranch,
      });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const Logout = async (req, res) => {
  try {
    // Clear the "lInfo" cookie
    res.clearCookie("lInfo");

    // You can also send a response indicating successful logout
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
