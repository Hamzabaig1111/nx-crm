import React from "react";
import axios from "axios"; // You might need to install axios if not already installed
import Header from "../components/Header";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import FeeLoadingSkeleton from "../components/LoadingSkelton";
import { Link } from "react-router-dom";
import "../styles/OrdersPage.css";
const OrdersPage = () => {
  // Send form data to your API for processing
  const { isPending, error, data } = useQuery({
    queryKey: ["OrderData"],
    queryFn: () =>
      axios
        .get("https://crm-lms-sever.vercel.app/api/orders/", {
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        }),
  });
  const handleDeleteOrder = async (id) => {
    try {
      const response = await axios.delete(
        `https://crm-lms-sever.vercel.app/api/orders/${id}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        // Invalidate and refetch the data to update the UI
        QueryClient.invalidateQueries("OrderData");

        alert("Order deleted successfully!");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("You are not allowed to delete orders.");
      } else {
        console.error("Error deleting order by ID:", error);
        alert("Error deleting order. Please try again.");
      }
    }
  };

  return (
    <div className="OrdersContainer">
      <Header routeName="Orders" />
      <div className="OrdersContentContainer">
        <div className="filterContainer">
          <div className="currentUser">
            <span>Usama Ahmad</span>
          </div>
          <div>
            <form className="searchFormContainer" action="">
              <input type="text" placeholder="Search..." />
              <button className="searchbtn">Search</button>
            </form>
          </div>
        </div>
        {isPending ? (
          <div className="loeading">
            <FeeLoadingSkeleton />
          </div>
        ) : error ? (
          "An Error Occured"
        ) : (
          <div className="coursesTableContainer">
            <table className="orderTable">
              <thead>
                <tr>
                  <th className="table-header-order">Customer Name</th>
                  <th className="table-header-order">Email</th>
                  <th className="table-header-order">Project Category</th>
                  <th className="table-header-order">project Description</th>
                  <th className="table-header-order">Duration</th>
                  <th className="table-header-order">Project Price</th>
                  <th className="table-header-order">Completion Date</th>
                  <th className="table-header-order">Project Status</th>
                  <th className="table-header-order">Update</th>
                  <th className="table-header-order">Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((order) => (
                  <tr className="table-row-order" key={order._id}>
                    <td className="table-data-order">{order.customer_name}</td>
                    <td className="table-data-order">{order.customer_email}</td>
                    <td className="table-data-order">
                      {order.project_category}
                    </td>
                    <td className="table-data-order">
                      {order.project_description}
                    </td>
                    <td className="table-data-order">
                      {order.project_duration}
                    </td>
                    <td className="table-data-order">{order.project_price}</td>
                    <td className="table-data-order">
                      {order.expected_completion_date}
                    </td>
                    <td className="table-data-order">{order.project_status}</td>
                    <td className="table-data-order">
                      <Link to={`/orders/${order._id}`}>
                        {" "}
                        <PencilSquareIcon className="TableIcon" />
                      </Link>
                    </td>
                    <td
                      onClick={() => handleDeleteOrder(order._id)}
                      className="table-data-order"
                    >
                      <TrashIcon className="TableIcon" />
                    </td>
                    {/* ... other columns ... */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
