import React, { useState } from "react";
import "../styles/AddNewAgent.css";
import Header from "../components/Header";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Popup from "reactjs-popup";
import { XMarkIcon } from "@heroicons/react/24/outline";
import * as Yup from "yup";
import { useFormik } from "formik";

const validationSchema = Yup.object({
  agent_name: Yup.string().required("Agent name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  desigination: Yup.string().required("Designation is required"),
  contact: Yup.string().required("Contact is required"),
  joining_date: Yup.date().required("Joining date is required"),
  success_rate: Yup.string().required("Success rate is required"),
  password1: Yup.string().required("Password is required"),
  password2: Yup.string()
    .oneOf([Yup.ref("password1"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const AddNewAgent = () => {
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [agentCreated, setAgentCreated] = useState(false);

  const formik = useFormik({
    initialValues: {
      agent_name: "",
      email: "",
      desigination: "",
      contact: "",
      joining_date: "",
      success_rate: "",
      password1: "",
      password2: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleCreateAgent(values);
    },
  });

  const createAgentMutation = useMutation({
    mutationFn: (newAgent) => {
      return axios.post(
        "https://crm-lms-sever.vercel.app/api/agents/createagent",
        newAgent,
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      // Reset the form after successful creation
      setAgentCreated(true);
      formik.resetForm();
    },
  });

  const handleCreateAgent = (agentData) => {
    if (agentData.password1 !== agentData.password2) {
      // Show password match error popup
      setPasswordMatchError(true);
    } else {
      // Reset password match error state
      setPasswordMatchError(false);

      // Proceed with creating the agent
      createAgentMutation.mutate(agentData);
    }
  };

  return (
    <div className="agentAddContainer">
      <Header routeName="Add Agent" />
      <div className="AddAgentFormContainerNew">
        <form onSubmit={formik.handleSubmit} className="addagentformContainer">
          <div className="addAgentFormItemSingle">
            <label htmlFor="agent_name">Agent Name</label>
            <input
              type="text"
              name="agent_name"
              value={formik.values.agent_name}
              onChange={formik.handleChange}
            />
            {formik.touched.agent_name && formik.errors.agent_name && (
              <div className="error-message">{formik.errors.agent_name}</div>
            )}
          </div>
          <div className="addAgentFormItemSingle">
            <label htmlFor="email">Agent Email</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error-message">{formik.errors.email}</div>
            )}
          </div>
          <div className="addAgentFormItemSingle">
            <label htmlFor="desigination">Agent Designation</label>
            <input
              type="text"
              name="desigination"
              value={formik.values.desigination}
              onChange={formik.handleChange}
            />
            {formik.touched.desigination && formik.errors.desigination && (
              <div className="error-message">{formik.errors.desigination}</div>
            )}
          </div>
          <div className="addAgentFormItemSingle">
            <label htmlFor="contact">Contact</label>
            <input
              type="text"
              name="contact"
              value={formik.values.contact}
              onChange={formik.handleChange}
            />
            {formik.touched.contact && formik.errors.contact && (
              <div className="error-message">{formik.errors.contact}</div>
            )}
          </div>
          <div className="addAgentFormItemSingle">
            <label htmlFor="joining_date">Agent Joining Date</label>
            <input
              type="date"
              name="joining_date"
              value={formik.values.joining_date}
              onChange={formik.handleChange}
            />
            {formik.touched.joining_date && formik.errors.joining_date && (
              <div className="error-message">{formik.errors.joining_date}</div>
            )}
          </div>
          <div className="addAgentFormItemSingle">
            <label htmlFor="success_rate">Success Rate</label>
            <input
              type="text"
              name="success_rate"
              value={formik.values.success_rate}
              onChange={formik.handleChange}
            />
            {formik.touched.success_rate && formik.errors.success_rate && (
              <div className="error-message">{formik.errors.success_rate}</div>
            )}
          </div>
          <div className="addAgentFormItemSingle">
            <label htmlFor="password1">Password 1</label>
            <input
              type="password"
              name="password1"
              value={formik.values.password1}
              onChange={formik.handleChange}
            />
            {formik.touched.password1 && formik.errors.password1 && (
              <div className="error-message">{formik.errors.password1}</div>
            )}
          </div>
          <div className="addAgentFormItemSingle">
            <label htmlFor="password2">Password 2</label>
            <input
              type="password"
              name="password2"
              value={formik.values.password2}
              onChange={formik.handleChange}
            />
            {formik.touched.password2 && formik.errors.password2 && (
              <div className="error-message">{formik.errors.password2}</div>
            )}
          </div>
          <Popup
            className="mycustompopcontainer"
            open={passwordMatchError}
            closeOnDocumentClick
            onClose={() => setPasswordMatchError(false)}
          >
            <div className="passworddonotmatch">
              <div className="popupHeader">
                <span>Passwords do not match. Please try again.</span>
                <button
                  className="closeButton"
                  onClick={() => setPasswordMatchError(false)}
                >
                  <XMarkIcon className="closeIcon" />
                </button>
              </div>
            </div>
          </Popup>
          <Popup
            className="mycustompopcontainer"
            open={agentCreated}
            closeOnDocumentClick
            onClose={() => setAgentCreated(false)}
          >
            <div className="agentcreatedSuccsssContainer">
              Agent Created Successfully!
            </div>
            <button
              onClick={() => setAgentCreated(false)}
              className="closeButton"
            >
              {" "}
              <XMarkIcon className="closeIcon" />
            </button>
          </Popup>
          <button type="submit">Create Agent</button>
        </form>
      </div>
    </div>
  );
};

export default AddNewAgent;
