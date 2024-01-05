import React, { useState } from "react";
import "../styles/RegistractionFormPage.css";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "../components/BaseURL";
const InputFieldItem = ({
  label,
  name,
  type = "text",
  placeholdername,
  formik,
}) => {
  return (
    <div className="registerFromItem">
      <label htmlFor={`id_${name}`}>{label}</label>
      <input
        placeholder={placeholdername}
        type={type}
        id={`id_${name}`}
        name={name}
        className="formcontrollinput"
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched[name] && formik.errors[name] ? (
        <div className="error-message">{formik.errors[name]}</div>
      ) : null}
    </div>
  );
};
const InputFieldItemSelect = ({ label, name, formik }) => {
  return (
    <div className="registerFromItem">
      <label htmlFor={`id_${name}`}>{label}</label>
      <select
        onChange={formik.handleChange}
        value={formik.values[name]}
        name={name}
        id={`id_${name}`}
      >
        <option value="pending">Paid</option>
        <option value="applied">Applied</option>
      </select>
    </div>
  );
};

const InputFieldItemSelectFeeType = ({
  label,
  name,
  value,
  onChange,
  formik,
}) => {
  return (
    <div className="registerFromItem">
      <label htmlFor={`id_${name}`}>{label}</label>
      <select
        onChange={onChange}
        name={name}
        value={value}
        id={`id_${name}`}
        defaultValue={"cash"}
        defaultChecked={"cash"}
      >
        <option value="cash">Cash</option>
        <option value="banktransfer">Bank Transfer</option>
      </select>
    </div>
  );
};
const InputFieldItemSelectStatus = ({ label, name, formik }) => {
  return (
    <div className="registerFromItem">
      <label htmlFor={`id_${name}`}>{label}</label>
      <select
        onChange={formik.handleChange}
        value={formik.values[name]}
        name={name}
        id={`id_${name}`}
      >
        <option value="Paid">Paid</option>
        {/* Remove the selected attribute */}
        <option value="Installment">Installment</option>
      </select>
    </div>
  );
};

const InputFieldItemSelectAdvance = ({
  label,
  name,
  value,
  onChange,
  options,
  formik,
}) => {
  return (
    <div className="registerFromItem">
      <label htmlFor={`id_${name}`}>{label}</label>
      <select onChange={onChange} value={value} name={name} id={`id_${name}`}>
        <option value="" disabled hidden>
          Select {label}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
const RegistrationPage = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    student_name: Yup.string().required("Student name is required"),
    CNIC: Yup.string().required("CNIC is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    father_name: Yup.string().required("Fathter name is required"),
    phone: Yup.number()
      .typeError("Phone must be a number")
      .required("Phone is required"),
    address: Yup.string()
      .max(255, "Address must be at most 255 characters")
      .required("Address is required"),
    city: Yup.string().required("City is Required"),
    course_name: Yup.string().required("Course Name is Required"),
    course_category: Yup.string().required("Course Category is Required"),
    course_duration: Yup.number().required("Course Duratoin is Required"),
    course_fee: Yup.number().required("Course Fee is Required Field"),
    received_fee: Yup.number().required("Received Fee is Required Field"),
    num_installments: Yup.number().required("No of Installments is Required"),
    status: Yup.string().required("Status is Required"),
    doe: Yup.date()
      .typeError("Invalid date format")
      .required("Date of Enrollment is required"),
    agent: Yup.string().required("Agent Name is Required"),
    std_feetype: Yup.string().required("Fee Type is Required"),
    std_batch: Yup.string().required("Student Batch Name is Required"),
    zipcode: Yup.number().required("ZipCode is Required"),
    additionalNote: Yup.string().required(
      "Additional Note is Required If any discount or offers are entertained mention here otherwise mention NA "
    ),
    reference: Yup.string().required("Reference is Required"),
    card_status: Yup.string().required("Card Status is Required"),
    student_card_fee: Yup.number().required("Student Card Fee is Required"),
  });
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const agentBranch = localStorage.getItem("agentBranch");
  const formik = useFormik({
    initialValues: {
      user: userId,
      agentBranch: agentBranch,
      student_name: "",
      CNIC: "",
      father_name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      course_name: "",
      course_category: "",
      course_duration: "",
      course_fee: "",
      received_fee: "",
      num_installments: "",
      status: "",
      doe: new Date().toISOString().split("T")[0],
      agent: username,
      std_feetype: "cash",
      std_batch: "",
      zipcode: "",
      additionalNote: "",
      reference: "",
      card_status: "",
      student_card_fee: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log("Form register", values);

        // Step 1: Create Admission Record
        const admissionResponse = await axios.post(
          "/admissions/createadmission",
          values,
          { withCredentials: true }
        );

        const studentData = admissionResponse.data.admissionRecord;
        console.log(studentData);

        // Step 2: Create Fee Record
        const feeRecordData = {
          user: userId,
          agent_branch: agentBranch,
          studentId: studentData._id,
          std_name: values.student_name,
          std_cnic: values.CNIC,
          std_coursename: values.course_name,
          agent_name: username,
          std_courseduration: values.course_duration,
          status: values.status,
          std_batch: values.std_batch,
          std_feetype: values.std_feetype,
          total_course_fee: parseFloat(values.course_fee),
          fee_on_admission_received: parseFloat(values.received_fee),
          no_of_installments: values.num_installments,
        };

        const feeRecordResponse = await axios.post(
          "/feerecord/create-fee-record",
          feeRecordData,
          { withCredentials: true }
        );

        console.log("Admission Response", admissionResponse);
        console.log("Fee Record Response", feeRecordResponse);
        // Step 3: Check if both records were created successfully
        if (
          admissionResponse.status === 201 &&
          feeRecordResponse.status === 201
        ) {
          // Reset the form on successful submission
          resetForm();
          // Navigate to the receipt page with student data
          navigate("/printrecepit", { state: studentData });
        } else {
          // Handle submission failure
          console.error("Submission failed. Please try again.");
        }
      } catch (error) {
        console.error(error);
        let errorMessage =
          "Error submitting the form. Please check the fields and try again.";

        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.errors
        ) {
          // Extract validation errors and display them
          errorMessage = Object.values(error.response.data.errors).join("\n");
        } else if (
          error.response &&
          error.response.data &&
          error.response.data.errorMessage
        ) {
          // Use the specific error message from the server
          errorMessage = error.response.data.errorMessage;
        }

        alert(errorMessage);
      }
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "course_category") {
      formik.setFieldValue("course_category", value);
      // Reset Course Name to an empty string when Category changes
      formik.setFieldValue("course_name", "");
    } else {
      formik.handleChange(e);
    }
  };

  const AllCoursesDataDetails = [
    {
      category: "Designing Courses",
      courses: [
        "Graphic Designing",
        "Digital Painting",
        "Character designing",
        "UI-UX Designing",
        "Digital Textile Designing",
        "Advance Textile Designing",
        "Video Editing",
        "VFX",
        "Interior Designing",
        "Interior & Exterior Designing",
        "Fashion Designing",
        "Freelancing",
        "Full Stack Designer",
        "2D Animation",
        "3D Animation",
        "Photography and Video Production",
        "3d max (Interior Designing)",
        "Chacter Designing with animation",
        "1 Year Graphic Designing Program",
      ],
    },
    {
      category: "Development Courses",
      courses: [
        "Front End Web Development",
        "Android App Development",
        "Python Django",
        "PHP / Laravel Development",
        "React JS Development",
        "React Native Development",
        "Data Science",
        "Game Development",
        "Game Development one Year",
        "Flutter Dart",
        "WordPress",
        "Blockchain",
        "Devops Engineering",
        "Cloud Computing",
        "Ethical Hacking",
        "Full Stack Web Development",
        "Cyber Security",
        "Mernstasack",
        "Bug Bounty & Penetration testing",
        "Learn App Dev (Anroid & IOS)",
        "Web 3.0",
        "SQA",
        "Software Engineering",
      ],
    },
    {
      category: "Marketing Courses",
      courses: [
        "Digital Media Marketing",
        "Digital Media Marketing",
        "Amazon virtual Assistant",
        "Ad campaign expert for Google ads, tiktok , Facebook and other",
        "networks",
        "Social Media Marketing",
        "E-commerce",
        "Daraz",
        "SEO",
        "Youtube Star",
        "Drop Shipping",
      ],
    },
    {
      category: "Personal Development",
      courses: ["Spoken English", "IELTS"],
    },
    {
      category: "Account & Finance",
      courses: ["Ms-office", "power Bi", "Quick Book", "SAP BI", "Power Query"],
    },
    {
      category: "Bootcamp",
      courses: [
        "Graphic Bootcamp",
        "Web Bootcamp",
        "Dmm Bootcamp",
        "Seo+Wordpress Bootcamp",
      ],
    },
  ];

  const filteredCourses =
    AllCoursesDataDetails.find(
      (data) => data.category === formik.values.course_category
    )?.courses || [];
  const handleSubmit = formik.handleSubmit;
  console.log(formik.values);
  return (
    <div className="container-fluid">
      <Header routeName="Registraction Form" />
      <section className="info_form1Form">
        <form onSubmit={handleSubmit}>
          <InputFieldItem
            label="Student Name"
            name="student_name"
            placeholdername="john due"
            formik={formik}
          />
          <InputFieldItem
            label="CNIC"
            name="CNIC"
            placeholdername="XXXXXXXXXXXX"
            type="number"
            formik={formik}
          />
          <InputFieldItem
            label="Father's Name"
            name="father_name"
            placeholdername="fater name"
            type="string"
            formik={formik}
          />
          <InputFieldItem
            label="Email"
            name="email"
            placeholdername="example@gmail.com"
            formik={formik}
            type="email"
          />
          <InputFieldItem
            label="Phone"
            name="phone"
            formik={formik}
            placeholdername="+XXXXXXXXXXX"
            type="tel"
          />
          <InputFieldItem
            label="Address"
            name="address"
            type="text"
            placeholdername="street adress 1234"
            formik={formik}
          />
          <InputFieldItem
            label="City"
            name="city"
            placeholdername="Lahore"
            formik={formik}
          />
          <InputFieldItemSelectAdvance
            label="Course Category"
            name="course_category"
            value={formik.values.course_category}
            onChange={handleChange}
            options={AllCoursesDataDetails.map((data) => data.category)}
            formik={formik}
          />
          <InputFieldItemSelectAdvance
            label="Course Name"
            name="course_name"
            value={formik.values.course_name}
            onChange={formik.handleChange}
            options={filteredCourses}
            formik={formik}
          />
          <InputFieldItem
            placeholdername="06"
            label="Course Duration"
            name="course_duration"
            type="number"
            formik={formik}
          />
          <InputFieldItem
            label="Course Fee"
            placeholdername="40000"
            name="course_fee"
            type="number"
            formik={formik}
          />
          <InputFieldItem
            label="Received Fee"
            name="received_fee"
            type="number"
            placeholdername="20000"
            formik={formik}
          />
          <InputFieldItem
            type="number"
            label="Number of Installments"
            name="num_installments"
            placeholdername="02"
            formik={formik}
          />
          <InputFieldItemSelectStatus
            label="Status"
            name="status"
            formik={formik}
          />
          <InputFieldItem
            label="Date of Enrollment"
            name="doe"
            formik={formik}
            type="date"
          />

          <InputFieldItemSelectFeeType
            label="Fee Type"
            name="std_feetype"
            formik={formik}
          />
          <InputFieldItem
            label="Student Batch"
            name="std_batch"
            placeholdername="batch A"
            formik={formik}
          />
          <InputFieldItem
            type="number"
            label="Zipcode"
            placeholdername="786543"
            name="zipcode"
            formik={formik}
          />
          <InputFieldItem
            label="Reference"
            name="reference"
            placeholdername="Reference Any"
            formik={formik}
          />
          <InputFieldItem
            type="number"
            label="Student Card Fee"
            name="student_card_fee"
            placeholdername="2000"
            formik={formik}
          />
          <InputFieldItemSelect
            label="Student Card"
            name="card_status"
            formik={formik}
          />
          <InputFieldItem
            type="text"
            label="Additional Note"
            placeholdername="If any discount or offers are entertained mention here otherwise mention NA "
            name="additionalNote"
            formik={formik}
          />
          <button
            type="submit"
            className="registersubmitbutton"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default RegistrationPage;
