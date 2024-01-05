import "../styles/AddNewUser.css";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Header from "../components/Header";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const AddNewUser = () => {
  const formik = useFormik({
    initialValues: {
      agent_fullName: "",
      email: "",
      desigination: "",
      userImage: "",
      contact: "",
      joining_date: "",
      success_rate: "",
      password: "",
      agentBranch: "",
      agent_username: "",
      is_admin: false,
      is_Accountant: false,
      is_employee: false,
      agentSignatureStamp:"",
    },
    validationSchema: Yup.object({
      agent_fullName: Yup.string().required("Full Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      userImage: Yup.string(),
      desigination: Yup.string().required("desigination is required"),
      contact: Yup.string().required("Contact is Required"),
      joining_date: Yup.string().required("Joining Date is Required"),
      success_rate: Yup.string(),
      password: Yup.string().required("Password is required"),
      agentBranch: Yup.string()
        .required("Agent Branch is required")
        .oneOf(
          ["Arfa Kareem", "Iqbal Town", "Johar Town"],
          "Invalid Agent Branch"
        ),
      agent_username: Yup.string().required("Agent Username is required"),
      agentSignatureStamp: Yup.string().required("Agent Signature Required"),
    }),
    onSubmit: async (values) => {
      try {
        await createNewUserMutation.mutateAsync(values);
        console.log("forObject", values);
      } catch (error) {
        // Handle errors if the submission fails
        console.error("Submission error:", error);
      }
    },
  });
  const handleCheckboxChange = (fieldName) => {
    // Uncheck other checkboxes when one is checked
    formik.setValues((prevValues) => ({
      ...prevValues,
      is_admin: fieldName === "is_admin" ? !prevValues.is_admin : false,
      is_Accountant:
        fieldName === "is_Accountant" ? !prevValues.is_Accountant : false,
      is_employee:
        fieldName === "is_employee" ? !prevValues.is_employee : false,
    }));
  };
  const createNewUserMutation = useMutation({
    mutationFn: (newAgent) => {
      return axios.post(
        "https://crm-lms-sever.vercel.app/api/agents/createagent",
        newAgent,
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      // Reset the form on successful mutation
      formik.resetForm();
      // Show alert for successful submission
      alert("Form submitted successfully!");
    },
    onError: (error) => {
      // Handle errors if the submission fails
      console.error("Submission error:", error);
      // Show alert for submission failure
      alert("Form submission failed. Please try again.");
    },
  });
  return (
    <div className="AddnewAgentContainer">
      <Header routeName="Add New User" />
      <div className="formContainerAddNewAgent">
        <form
          onSubmit={formik.handleSubmit}
          className="addnewagentformcontainer"
        >
          <div className="addnewItemAgentField">
            <label htmlFor="agent_fullName">Full Name:</label>
            <input
              type="text"
              id="agent_fullName"
              name="agent_fullName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.agent_fullName}
            />
            {formik.touched.agent_fullName && formik.errors.agent_fullName ? (
              <div className="mycustomErrorUser">
                {formik.errors.agent_fullName}
              </div>
            ) : null}
          </div>

          <div className="addnewItemAgentField">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="mycustomErrorUser">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="addnewItemAgentField">
            <label htmlFor="userImage">User Image:</label>
            <input
              type="text"
              id="userImage"
              name="userImage"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userImage}
            />
            {formik.touched.userImage && formik.errors.userImage ? (
              <div className="mycustomErrorUser">{formik.errors.userImage}</div>
            ) : null}
          </div>

          <div className="addnewItemAgentField">
            <label htmlFor="contact">Contact:</label>
            <input
              type="text"
              id="contact"
              name="contact"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contact}
            />
            {formik.touched.contact && formik.errors.contact ? (
              <div className="mycustomErrorUser">{formik.errors.contact}</div>
            ) : null}
          </div>
          <div className="addnewItemAgentField">
            <label htmlFor="desigination">Select Desigination:</label>
            <select
              id="desigination"
              name="desigination"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.desigination}
            >
              <option value="" label="Select an Desigination" />
              <option value="agent" label="Agent" />
              <option value="accountant" label="Accountant" />
              <option value="admin" label="Admin" />
            </select>
            {formik.touched.desigination && formik.errors.desigination ? (
              <div className="mycustomErrorUser">
                {formik.errors.desigination}
              </div>
            ) : null}
          </div>
          {/* Agent Desigination */}
          <div className="addnewItemAgentField">
            <label htmlFor="joining_date">Joining Date:</label>
            <input
              type="date"
              id="joining_date"
              name="joining_date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.joining_date}
            />
            {formik.touched.joining_date && formik.errors.joining_date ? (
              <div className="mycustomErrorUser">
                {formik.errors.joining_date}
              </div>
            ) : null}
          </div>
          <div className="addnewItemAgentField">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="mycustomErrorUser">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="addnewItemAgentField">
            <label htmlFor="agentBranch">Select Branch:</label>
            <select
              id="agentBranch"
              name="agentBranch"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.agentBranch}
            >
              <option value="" label="Select an Branch" />
              <option value="Arfa Kareem" label="Arfa Kareem" />
              <option value="Iqbal Town" label="Iqbal Town" />
              <option value="Johar Town" label="Johar Town" />
            </select>
            {formik.touched.agentBranch && formik.errors.agentBranch ? (
              <div className="mycustomErrorUser">
                {formik.errors.agentBranch}
              </div>
            ) : null}
          </div>

          <div className="addnewItemAgentField">
            <label htmlFor="agent_username">Agent Username:</label>
            <input
              type="text"
              id="agent_username"
              name="agent_username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.agent_username}
            />
            {formik.touched.agent_username && formik.errors.agent_username ? (
              <div className="mycustomErrorUser">
                {formik.errors.agent_username}
              </div>
            ) : null}
          </div>
          <div className="addnewItemAgentField">
            <label htmlFor="agentSignatureStamp">Agent Signature:</label>
            <input
              type="text"
              id="agentSignatureStamp"
              name="agentSignatureStamp"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.agentSignatureStamp}
            />
            {formik.touched.agentSignatureStamp && formik.errors.agentSignatureStamp ? (
              <div className="mycustomErrorUser">
                {formik.errors.agentSignatureStamp}
              </div>
            ) : null}
          </div>
          <div className="agentCheckboxContainer">
            <label htmlFor="is_admin">Is Admin:</label>
            <input
              type="checkbox"
              id="is_admin"
              name="is_admin"
              onChange={() => handleCheckboxChange("is_admin")}
              checked={formik.values.is_admin}
            />
          </div>

          <div className="agentCheckboxContainer">
            <label htmlFor="is_Accountant">Is Accountant:</label>
            <input
              type="checkbox"
              id="is_Accountant"
              name="is_Accountant"
              onChange={() => handleCheckboxChange("is_Accountant")}
              checked={formik.values.is_Accountant}
            />
          </div>

          <div className="agentCheckboxContainer">
            <label htmlFor="is_employee">Is Agent:</label>
            <input
              type="checkbox"
              id="is_employee"
              name="is_employee"
              onChange={() => handleCheckboxChange("is_employee")}
              checked={formik.values.is_employee}
            />
          </div>

          <button disabled={createNewUserMutation.isPending} type="submit">
            {createNewUserMutation.isPending ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewUser;
