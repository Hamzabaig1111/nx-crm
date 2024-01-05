import Lead from "../models/leadsmodel.js";

export const CreateLead = async (req, res) => {
  try {
    const leads = req.body;

    // Validate leads if needed

    // Insert the array of leads into the database
    const savedLeads = await Lead.insertMany(leads);

    res.status(201).json(savedLeads);
  } catch (error) {
    console.error("Error submitting leads:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errormsg: error.message });
  }
};

// Get all leads
export const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.status(200).json(leads);
  } catch (error) {
    console.error("Error getting leads:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a specific lead by ID
export const GetSingleLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.leadId);
    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }
    res.status(200).json(lead);
  } catch (error) {
    console.error("Error getting lead by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a lead by ID
export const UpdateLead = async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.leadId,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedLead) {
      return res.status(404).json({ error: "Lead not found" });
    }
    res.status(200).json({ message: "Lead Update successfully", updatedLead });
  } catch (error) {
    console.error("Error updating lead by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a lead by ID
export const DeleteLead = async (req, res) => {
  try {
    const deletedLead = await Lead.findByIdAndDelete(req.params.leadId);
    if (!deletedLead) {
      return res.status(404).json({ error: "Lead not found" });
    }
    res.status(200).json({ message: "Lead deleted successfully", deletedLead });
  } catch (error) {
    console.error("Error deleting lead by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAgentCounts = async (req, res) => {
  try {
    const agentCounts = await Lead.aggregate([
      {
        $group: {
          _id: null,
          success: { $sum: { $cond: [{ $eq: ["$status", "success"] }, 1, 0] } },
          pending: { $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] } },
          visit: { $sum: { $cond: [{ $eq: ["$status", "visit"] }, 1, 0] } },
          futureProspect: {
            $sum: { $cond: [{ $eq: ["$status", "future prospect"] }, 1, 0] },
          },
          totalLeads: { $sum: 1 },
        },
      },
    ]);

    const result = agentCounts[0] || {
      success: 0,
      pending: 0,
      visit: 0,
      futureProspect: 0,
      totalLeads: 0,
    };

    res.status(200).json(result);
  } catch (error) {
    console.error("Error getting agent counts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCurrentAgentLeads = async (req, res) => {
  const agentId = req.params.agentId;

  try {
    const isAdmin = req.user.is_superadmin;
    const branchname = req.user.branchname;
    // Find leads based on the user's role
    let leads;
    if (isAdmin) {
      // If the user is an admin, retrieve all leads
      leads = await Lead.find({ branchname });
    } else {
      // If the user is not an admin, find leads associated with the specified agentId
      leads = await Lead.find({ agentId });
    }
    if (leads.length > 0) {
      res.status(200).json(leads);
    } else {
      res.status(200).json({ message: "No Leads Data Found!!" });
    }
  } catch (error) {
    console.error("Error getting leads:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
