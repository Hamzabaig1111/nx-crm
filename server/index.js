// index.mjs
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import aagentRoute from "./routes/aagentroute.js";
import authRouter from "./auth/register.js";
import userRoute from "./routes/userroute.js";
import admissionRoute from "./routes/admissionroute.js";
import courseRoute from "./routes/courseroute.js";
import earningRoute from "./routes/earningroute.js";
import expenseRoute from "./routes/expenseroute.js";
import feeRecordRoute from "./routes/feerecordroute.js";
import leadRoute from "./routes/leadroute.js";
import orderRoute from "./routes/orderroute.js";
import agentFileRoute from "./Files/agentfile.js";
import cookieParser from "cookie-parser";
// Create Express app
const app = express();
dotenv.config();
// Assuming you have an Express app instance named 'app'

// Connect to MongoDB using try-catch approach
try {
  await mongoose.connect(
    "mongodb+srv://hamzabaig1111:hamzabaig1111@cluster0.liscafg.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("Database Connection Successfully!!");
} catch (error) {
  console.error("Error connecting to MongoDB:", error.message);
  process.exit(1); // Exit the process if unable to connect to MongoDB
}

// Middleware to parse JSON requests
// Middleware to parse JSON requests
// Middleware to parse JSON requests
app.use(
  cors({
    origin: "https://nexskill.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200, // Change this to 200
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*",cors()); // Enable pre-flight for all routes
app.use(express.json());
app.use(cookieParser());

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, this is your MERN stack backend!");
});
app.use("/api/agents/", aagentRoute);
app.use("/api/auth/", authRouter);
app.use("/api/users/", userRoute);
app.use("/api/admissions/", admissionRoute);
app.use("/api/courses/", courseRoute);
app.use("/api/earning/", earningRoute);
app.use("/api/expenses/", expenseRoute);
app.use("/api/feerecord/", feeRecordRoute);
app.use("/api/leads/", leadRoute);
app.use("/api/orders/", orderRoute);
app.use("/api/agentsdata/", agentFileRoute);
// Error handling middleware
// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res
    .status(500)
    .json({ error: "Internal Server Error", message: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
