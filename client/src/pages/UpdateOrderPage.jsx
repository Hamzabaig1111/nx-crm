import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as Yup from "yup";
import Header from "../components/Header";
import "../styles/UpdateOrder.css";

const UpdateOrderPage = () => {
  const { orderId } = useParams();
  const {
    isPending,
    error,
    data: initialOrders,
    refetch,
  } = useQuery({
    queryKey: ["SingleOrder"],
    queryFn: () =>
      axios
        .get(`https://crm-lms-sever.vercel.app/api/orders/${orderId}`, {
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        }),
  });
  const [Orders, setOrders] = useState(initialOrders || {});
  const [fieldErrors, setFieldErrors] = useState({});

  console.log(Orders);

  useEffect(() => {
    setOrders(initialOrders);
  }, [initialOrders]);

  const UpdateOrderMutation = useMutation({
    mutationFn: (updateData) => {
      return axios.put(
        `https://crm-lms-sever.vercel.app/api/orders/${orderId}`,
        updateData,
        { withCredentials: true }
      );
    },
  });

  const handleUpdate = async () => {
    try {
      // Validate using Yup schema
      await validationSchema.validate(Orders, { abortEarly: false });

      // If validation succeeds, mutate the data
      UpdateOrderMutation.mutate(Orders);
      refetch();
    } catch (validationError) {
      // Handle Yup validation errors
      const errors = {};
      validationError.inner.forEach((error) => {
        errors[error.path] = error.message;
      });

      // Update the fieldErrors state
      setFieldErrors(errors);

      // Log the errors to the console
      console.error("Validation Error:", errors);
    }
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    customer_name: Yup.string().required("Name is required"),
    customer_email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    project_category: Yup.string().required("Designation is required"),
    project_description: Yup.string().required("Email is required"),
    project_duration: Yup.string().required("Success Rate is required"),
    project_price: Yup.string().required("Success Rate is required"),
    expected_completion_date: Yup.string().required("Success Rate is required"),
    project_status: Yup.string().required("Status is required"),
  });

  return (
    <div className="UpdateOrderContainer">
      <Header routeName="Update Order" />
      <div className="UpdateedOrderContainer">
        <form>
          <div className="formItemOrder">
            <label>Name:</label>
            <input
              required
              type="text"
              value={Orders?.customer_name}
              onChange={(e) =>
                setOrders({ ...Orders, customer_name: e.target.value })
              }
            />
            {fieldErrors.customer_name && (
              <div className="error-message">{fieldErrors.customer_name}</div>
            )}
          </div>
          <div className="formItemOrder">
            <label>Contact:</label>
            <input
              required
              type="text"
              value={Orders?.customer_email}
              onChange={(e) =>
                setOrders({ ...Orders, customer_email: e.target.value })
              }
            />
            {fieldErrors.customer_email && (
              <div className="error-message">{fieldErrors.customer_email}</div>
            )}
          </div>
          <div className="formItemOrder">
            <label>Success Rate:</label>
            <input
              required
              type="text"
              value={Orders?.project_duration}
              onChange={(e) =>
                setOrders({ ...Orders, project_duration: e.target.value })
              }
            />
            {fieldErrors.project_duration && (
              <div className="error-message">
                {fieldErrors.project_duration}
              </div>
            )}
          </div>

          <div className="formItemOrder">
            <label>Project Price:</label>
            <input
              required
              type="text"
              value={Orders?.project_price}
              onChange={(e) =>
                setOrders({ ...Orders, project_price: e.target.value })
              }
            />
            {fieldErrors.project_price && (
              <div className="error-message">{fieldErrors.project_price}</div>
            )}
          </div>

          <div className="formItemOrder">
            <label>Expected Completion Date:</label>
            <input
              required
              type="date"
              value={Orders?.expected_completion_date}
              onChange={(e) =>
                setOrders({
                  ...Orders,
                  expected_completion_date: e.target.value,
                })
              }
            />
            {fieldErrors.expected_completion_date && (
              <div className="error-message">
                {fieldErrors.expected_completion_date}
              </div>
            )}
          </div>
          <div className="formItemOrder">
            <label>Project Description:</label>
            <textarea
              required
              value={Orders?.project_description}
              onChange={(e) =>
                setOrders({ ...Orders, project_description: e.target.value })
              }
            />
            {fieldErrors.project_description && (
              <div className="error-message">
                {fieldErrors.project_description}
              </div>
            )}
          </div>
          <div className="formItemOrder">
            <label>Status:</label>
            <select
              value={Orders?.project_status}
              onChange={(e) =>
                setOrders({
                  ...Orders,
                  project_status: e.target.value,
                })
              }
            >
              <option value="Pending">Pending</option>
              <option value="Inprogress">InProgress</option>
              <option value="Delivered">Delivered</option>
            </select>
            {fieldErrors.project_status && (
              <div className="error-message">{fieldErrors.project_status}</div>
            )}
          </div>

          {UpdateOrderMutation.isPending ? (
            <div className="myLoader_container">
              <div className="myLoader"></div>
            </div>
          ) : (
            <button type="button" onClick={handleUpdate}>
              Update Agent
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdateOrderPage;
