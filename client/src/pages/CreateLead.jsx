import React, { useState } from "react";
import "../styles/CreateLead.css";
import Header from "../components/Header";
import { useMutation } from "@tanstack/react-query";
import axios from "../components/BaseURL";
import Popup from "reactjs-popup";
import { XMarkIcon } from "@heroicons/react/24/outline";
import * as Yup from "yup";

const CreateLead = () => {
  const userId = localStorage.getItem("userId");
  const branchname = localStorage.getItem("branchname");
  const [createLead, setCreateLead] = useState(false);
  const [leadData, setLeadData] = useState({
    name: "",
    mobile: "",
    email: "",
    status: "pending",
    course_interested: "",
    source: "",
    reference: "",
    user: userId,
    branchname: branchname,
  });
  const [fieldErrors, setFieldErrors] = useState({});

  const handleLeadDataChange = (e) => {
    const { name, value } = e.target;
    setLeadData((previousData) => ({ ...previousData, [name]: value }));
  };

  const CreateLeadMutation = useMutation({
    mutationFn: (newLead) => {
      return axios.post(
        "/leads/createlead",
        newLead,
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      // Reset the form after successful creation
      setCreateLead(true);
      setLeadData({
        stdname: "",
        mobile: "",
        email: "",
        status: "pending",
        course_interested: "",
        source: "",
        reference: "",
      });
    },
  });

  const handleCreateLead = async (e) => {
    e.preventDefault();

    try {
      // Validate using Yup schema
      await validationSchema.validate(leadData, { abortEarly: false });

      // If validation succeeds, mutate the data
      CreateLeadMutation.mutate(leadData);
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
    stdname: Yup.string().required("Name is required"),
    mobile: Yup.string()
      .matches(/^\d+$/, "Mobile must be a number")
      .required("Mobile is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    status: Yup.string().required("Status is required"),
    course_interested: Yup.string().required("Course Interested is required"),
    source: Yup.string().required("Source is required"),
    reference: Yup.string().required("Reference is required"),
  });

  return (
    <div className="CreateLeadouterContainer">
      <Header routeName="Create Lead" />
      <form onSubmit={handleCreateLead} className="createLeadFormContainer">
        <div className="creatLeadFormItem">
          <label htmlFor="name">Name</label>
          <input
            value={leadData.stdname}
            onChange={handleLeadDataChange}
            type="text"
            name="stdname"
            id="stdname"
          />
          {fieldErrors.name && (
            <div className="error-message">{fieldErrors.stdname}</div>
          )}
        </div>

        <div className="creatLeadFormItem">
          <label htmlFor="mobile">Mobile</label>
          <input
            value={leadData.mobile}
            onChange={handleLeadDataChange}
            type="number"
            name="mobile"
            id="mobile"
          />
          {fieldErrors.mobile && (
            <div className="error-message">{fieldErrors.mobile}</div>
          )}
        </div>

        <div className="creatLeadFormItem">
          <label htmlFor="email">Email</label>
          <input
            value={leadData.email}
            onChange={handleLeadDataChange}
            type="email"
            name="email"
            id="email"
          />
          {fieldErrors.email && (
            <div className="error-message">{fieldErrors.email}</div>
          )}
        </div>

        <div className="creatLeadFormItem">
          <label htmlFor="course_interested">Course Interested</label>
          <input
            value={leadData.course_interested}
            onChange={handleLeadDataChange}
            type="text"
            name="course_interested"
            id="course_interested"
          />
          {fieldErrors.course_interested && (
            <div className="error-message">{fieldErrors.course_interested}</div>
          )}
        </div>

        <div className="creatLeadFormItem">
          <label htmlFor="source">Source</label>
          <input
            value={leadData.source}
            onChange={handleLeadDataChange}
            type="text"
            name="source"
            id="source"
          />
          {fieldErrors.source && (
            <div className="error-message">{fieldErrors.source}</div>
          )}
        </div>

        <div className="creatLeadFormItem">
          <label htmlFor="reference">Reference</label>
          <input
            value={leadData.reference}
            onChange={handleLeadDataChange}
            type="text"
            name="reference"
            id="reference"
          />
          {fieldErrors.reference && (
            <div className="error-message">{fieldErrors.reference}</div>
          )}
        </div>

        <div className="creatLeadFormItem">
          <label htmlFor="status">Status</label>
          <select
            value={leadData.status}
            onChange={handleLeadDataChange}
            name="status"
            id="status"
          >
            <option value="pending">Pending</option>
            <option value="success">Success</option>
            <option value="future_prospects">Future Prospects</option>
            <option value="visit">Visit</option>
            <option value="not interested">Not Interested</option>
          </select>
          {fieldErrors.status && (
            <div className="error-message">{fieldErrors.status}</div>
          )}
        </div>

        {/* ... (other form fields) */}

        <Popup
          className="mycustompopcontainer"
          open={createLead}
          closeOnDocumentClick
          onClose={() => setCreateLead(false)}
        >
          <div className="agentcreatedSuccsssContainer">
            Agent Created Successfully!
          </div>
          <button onClick={() => setCreateLead(false)} className="closeButton">
            <XMarkIcon className="closeIcon" />
          </button>
        </Popup>
        <button type="submit" className="leadsubmitbutton">
          Create Lead
        </button>
      </form>
    </div>
  );
};

export default CreateLead;
