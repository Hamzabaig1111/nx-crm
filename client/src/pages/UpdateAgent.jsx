import React, { useEffect, useState } from "react";
import "../styles/UpdateAgent.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../components/BaseURL";
import Header from "../components/Header";
import { useFormik } from "formik";
import * as Yup from "yup";
const UpdateAgent = () => {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const {
    isPending,
    error,
    data: initialAgentData,
  } = useQuery({
    queryKey: ["singleAgent", agentId],
    queryFn: () =>
      axios
        .get(`/agents/${agentId}`, {
          withCredentials: true,
        })
        .then((res) => res.data),
  });
  const validationSchema = Yup.object({
    agent_name: Yup.string().required("Agent name is required"),
    contact: Yup.string().required("Contact is required"),
    joining_date: Yup.string().required("Joining date is required"),
    desigination: Yup.string().required("Designation is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    success_rate: Yup.string().required("Success rate is required"),
  });
  const formik = useFormik({
    initialValues: {
      agent_name: initialAgentData?.agent_username || "", // Change to agent_username
      contact: initialAgentData?.contact || "",
      joining_date: initialAgentData?.joining_date || "",
      desigination: initialAgentData?.desigination || "",
      email: initialAgentData?.email || "",
      success_rate: initialAgentData?.success_rate || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      UpdateAgentMutation.mutate(values);
      // No need to refetch here
    },
  });

  const UpdateAgentMutation = useMutation({
    mutationFn: (updateData) => {
      return axios.put(
        `/agents/${agentId}`,
        updateData,
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      // Navigate to "/agents" after successful update
      // Use the `replace` option to replace the current entry in the history
      navigate("/agents", { replace: true });
    },
  });
  if (isPending) return <div>Loading....</div>;
  if (error) return <div>Error {error.message}</div>;
  return (
    <div className="UpdateAgentContainer">
      <Header routeName="Update Agent " />
      <div className="updateFormAgentContainer">
        <form onSubmit={formik.handleSubmit}>
          <div className="formItemAgent">
            <label>Name:</label>
            <input
              type="text"
              name="agent_name"
              value={formik.values.agent_name}
              onChange={formik.handleChange}
            />
            {formik.touched.agent_name && formik.errors.agent_name ? (
              <div className="error-message">{formik.errors.agent_name}</div>
            ) : null}
          </div>
          <div className="formItemAgent">
            <label>Contact:</label>
            <input
              type="text"
              name="contact"
              value={formik.values.contact}
              onChange={formik.handleChange}
            />
            {formik.touched.contact && formik.errors.contact ? (
              <div className="error-message">{formik.errors.contact}</div>
            ) : null}
          </div>
          <div className="formItemAgent">
            <label>Joining Date:</label>
            <input
              type="text"
              name="joining_date"
              value={formik.values.joining_date}
              onChange={formik.handleChange}
            />
            {formik.touched.joining_date && formik.errors.joining_date ? (
              <div className="error-message">{formik.errors.joining_date}</div>
            ) : null}
          </div>
          <div className="formItemAgent">
            <label>Designation:</label>
            <input
              type="text"
              name="desigination"
              value={formik.values.desigination}
              onChange={formik.handleChange}
            />
            {formik.touched.desigination && formik.errors.desigination ? (
              <div className="error-message">{formik.errors.desigination}</div>
            ) : null}
          </div>
          <div className="formItemAgent">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error-message">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="formItemAgent">
            <label>Success Rate:</label>
            <input
              type="text"
              name="success_rate"
              value={formik.values.success_rate}
              onChange={formik.handleChange}
            />
            {formik.touched.success_rate && formik.errors.success_rate ? (
              <div className="error-message">{formik.errors.success_rate}</div>
            ) : null}
          </div>
          {UpdateAgentMutation.isPending ? (
            <div className="myLoader_container">
              <div className="myLoader"></div>
            </div>
          ) : (
            <button type="submit">Update Agent</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdateAgent;
