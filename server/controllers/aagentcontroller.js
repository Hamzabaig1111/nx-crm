import bcrypt from "bcrypt";
import Agent from "../models/aagentmodel.js";
import { startOfDay, endOfDay } from "date-fns";
import FeeRecord from "../models/feerecordmodel.js";
// Route to create a new agent
export const CreateAagent = async (req, res, next) => {
  try {
    const {
      joining_date,
      email,
      agent_username,
      desigination,
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
      agentSignatureStamp,
    } = req.body;
    // Check if the agent already exists
    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      return res.status(400).json({ message: "Agent already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new agent
    const newAgent = new Agent({
      joining_date,
      email,
      agent_username,
      contact,
      desigination,
      created_at,
      agent_fullName,
      userImage,
      success_rate,
      agentBranch,
      is_admin,
      is_Accountant,
      is_employee,
      password: hashedPassword,
      agentSignatureStamp,
    });

    // Save the agent to the database
    await newAgent.save();

    res.status(201).json({ message: "Agent created successfully" });
  } catch (error) {
    console.error("Error creating agent:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", errmsg: error.message });
  }
};

// Update an agent by ID
export const UpdateAgent = async (req, res) => {
  try {
    const updatedAgent = await Agent.findByIdAndUpdate(
      req.params.agentId,
      req.body,
      { new: true }
    );
    if (!updatedAgent) {
      return res.status(404).json({ error: "Agent not found" });
    }
    res.json(updatedAgent);
  } catch (error) {
    console.error("Error updating agent by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete an agent by ID
export const DeleteAagent = async (req, res) => {
  try {
    const deletedAgent = await Agent.findByIdAndDelete(req.params.agentId);
    if (!deletedAgent) {
      return res.status(404).json({ error: "Agent not found" });
    }
    res.json(deletedAgent);
  } catch (error) {
    console.error("Error deleting agent by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a specific agent by ID
export const GetSingleAgent = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.agentId);
    if (!agent) {
      return res.status(404).json({ error: "Agent not found" });
    }
    res.json(agent);
  } catch (error) {
    console.error("Error getting agent by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all agents
export const GetAllAgents = async (req, res) => {
  try {
    const { is_superadmin, agentBranch } = req.user;
    console.log(is_superadmin, agentBranch);
    // If the user is a regular admin, fetch agents only for their branch
    if (is_superadmin) {
      const agents = await Agent.find({ agentBranch });
      return res.status(200).json(agents);
    }
    const agents = await Agent.find();
    res.status(200).json(agents);
  } catch (error) {
    console.error("Error getting agents:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const GetAgentsNames = async (req, res) => {
  try {
    const agentsnames = await Agent.find({}, "agent_fullName");
    const agentNamesList = agentsnames.map((agent) => agent.agent_fullName);
    res.status(200).json({ status: "success", data: agentNamesList });
  } catch (error) {
    console.error("Error getting agents:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const GetTotalNumberOfAagents = async (req, res) => {
  try {
    const totalNoAgents = await Agent.countDocuments();
    res.status(200).json(totalNoAgents);
  } catch (error) {
    console.error("Error getting total number of Agents:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to filter and calculate daily earnings for Arfa Kareem branch
export const GetDailyEarningsArfaKareem = async (req, res) => {
  try {
    const branch = "Arfa Kareem";
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    const result = await FeeRecord.aggregate([
      {
        $match: {
          created_at: { $gte: todayStart, $lte: todayEnd },
          agent_branch: branch,
        },
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: "$updated_received_fee" },
          records: {
            $push: {
              _id: "$_id",
              studentId: "$studentId",
              std_name: "$std_name",
              std_cnic: "$std_cnic",
              std_coursename: "$std_coursename",
              agent_name: "$agent_name",
              agent_branch: "$agent_branch",
              std_courseduration: "$std_courseduration",
              status: "$status",
              std_batch: "$std_batch",
              std_feetype: "$std_feetype",
              total_course_fee: "$total_course_fee",
              fee_on_admission_received: "$fee_on_admission_received",
              updated_received_fee: "$updated_received_fee",
              updated_receivable_fee: "$updated_receivable_fee",
              no_of_installments: "$no_of_installments",
            },
          },
        },
      },
    ]);

    const records = result.length > 0 ? result[0].records : [];
    const totalEarnings = result.length > 0 ? result[0].totalEarnings : 0;
    res.status(200).json({ branch, totalEarnings, feeRecords: records });
  } catch (error) {
    console.error("Error fetching daily earnings for Arfa Kareem:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errormsj: error.message });
  }
};

// Function to filter and calculate daily earnings for Iqbal Town branch
export const GetDailyEarningsIqbalTown = async (req, res) => {
  try {
    const branch = "Iqbal Town";
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    const result = await FeeRecord.aggregate([
      {
        $match: {
          created_at: { $gte: todayStart, $lte: todayEnd },
          agent_branch: branch,
        },
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: "$updated_received_fee" },
          records: {
            $push: {
              _id: "$_id",
              studentId: "$studentId",
              std_name: "$std_name",
              std_cnic: "$std_cnic",
              std_coursename: "$std_coursename",
              agent_name: "$agent_name",
              agent_branch: "$agent_branch",
              std_courseduration: "$std_courseduration",
              status: "$status",
              std_batch: "$std_batch",
              std_feetype: "$std_feetype",
              total_course_fee: "$total_course_fee",
              fee_on_admission_received: "$fee_on_admission_received",
              updated_received_fee: "$updated_received_fee",
              updated_receivable_fee: "$updated_receivable_fee",
              no_of_installments: "$no_of_installments",
            },
          },
        },
      },
    ]);

    const records = result.length > 0 ? result[0].records : [];
    const totalEarnings = result.length > 0 ? result[0].totalEarnings : 0;
    res.status(200).json({ branch, totalEarnings, feeRecords: records });
  } catch (error) {
    console.error("Error fetching daily earnings for Iqbal Town:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errormsj: error.message });
  }
};

export const GetDailyEarningsJoharTown = async (req, res) => {
  try {
    const branch = "Johar Town";
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    const result = await FeeRecord.aggregate([
      {
        $match: {
          created_at: { $gte: todayStart, $lte: todayEnd },
          agent_branch: branch,
        },
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: "$updated_received_fee" },
          records: {
            $push: {
              _id: "$_id",
              studentId: "$studentId",
              std_name: "$std_name",
              std_cnic: "$std_cnic",
              std_coursename: "$std_coursename",
              agent_name: "$agent_name",
              agent_branch: "$agent_branch",
              std_courseduration: "$std_courseduration",
              status: "$status",
              std_batch: "$std_batch",
              std_feetype: "$std_feetype",
              total_course_fee: "$total_course_fee",
              fee_on_admission_received: "$fee_on_admission_received",
              updated_received_fee: "$updated_received_fee",
              updated_receivable_fee: "$updated_receivable_fee",
              no_of_installments: "$no_of_installments",
            },
          },
        },
      },
    ]);

    const records = result.length > 0 ? result[0].records : [];
    const totalEarnings = result.length > 0 ? result[0].totalEarnings : 0;
    res.status(200).json({ branch, totalEarnings, feeRecords: records });
  } catch (error) {
    console.error("Error fetching daily earnings for Johar Town:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errormsj: error.message });
  }
};
