import Order from "../models/ordermodel.js";

export const CreateOrder = async (req, res) => {
  try {
    // Extract form data from the request body
    const {
      customer_name,
      customer_email,
      project_category,
      project_type,
      project_description,
      project_duration,
      project_price,
      expected_completion_date,
      project_status,
    } = req.body;

    // Create a new instance of the Order model
    const newOrder = new Order({
      customer_name,
      customer_email,
      project_category,
      project_type,
      project_description,
      project_duration,
      project_price,
      expected_completion_date,
      project_status,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Respond with a success message or the saved order
    res.status(201).json(savedOrder);
  } catch (error) {
    // Handle errors
    console.error("Error submitting order:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errorMessage: error.message });
  }
};

// Get all orders
export const GetAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a specific order by ID
export const GetSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error("Error getting order by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an order by ID
export const UpdateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete an order by ID
export const DeleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(deletedOrder);
  } catch (error) {
    console.error("Error deleting order by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const GetTotalNumberofOrders = async (req, res) => {
  try {
    const totalnumberofOrdres = await Order.countDocuments({
      project_status: "Inprogress",
    });

    res.status(200).json({ totalnumberofOrdres });
  } catch (error) {
    console.error("Error getting total number of orders:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const GetRecentProjectsRecord = async (req, res) => {
  try {
    // Use aggregation to get the latest 3 orders
    const recentProjects = await Order.aggregate([
      { $sort: { created_at: -1 } }, // Sort in descending order based on creation date
      { $limit: 3 }, // Limit the result to 3 documents
    ]);

    res.status(200).json(recentProjects);
  } catch (error) {
    console.error("Error getting total recents of orders:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
