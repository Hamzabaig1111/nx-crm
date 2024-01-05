import React, { useState } from "react";
import "../styles/AddNewPage.css";
import Header from "../components/Header";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "../components/BaseURL";

const AddNewCoursePage = () => {
  let userId = localStorage.getItem("userId");
  const [courseData, setCourseData] = useState({
    userId,
    course_name: "",
    course_cat: "",
    Batch: "",
    instructor_name: "",
    course_duration: "",
    no_of_classes_in_week: "",
    status: "inprogress",
  });

  const [fieldErrors, setFieldErrors] = useState({});

  const handleCourseDataChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate using Yup schema
      await validationSchema.validate(courseData, { abortEarly: false });

      // Use the mutation to send the API request
      AddNewCourseMutation.mutate(courseData);
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
    course_name: Yup.string().required("Course Name is required"),
    course_cat: Yup.string().required("Course Type is required"),
    Batch: Yup.string().required("Batch is required"),
    instructor_name: Yup.string().required("Instructor Name is required"),
    course_duration: Yup.string().required("Course Duration is required"),
    no_of_classes_in_week: Yup.string().required("No of Classes is required"),
    status: Yup.string().required("Status is required"),
  });
  const AddNewCourseMutation = useMutation({
    mutationFn: (newCourse) => {
      // Use axios to send the API request
      return axios.post(
        "/courses/createcourse",
        newCourse,
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: () => {
      // Reset the form on successful mutation
      setCourseData({
        course_name: "",
        course_cat: "",
        Batch: "",
        instructor_name: "",
        course_duration: "",
        no_of_classes_in_week: "",
        status: "inprogress",
      });
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
    <div className="AddNewPageCourseContainer">
      <Header routeName="Add New Course" />
      <div className="addCourseParentContainer">
        <div className="addnewCourseFormContainer">
          <form onSubmit={handleSubmit} className="addnewcouresformcontainer">
            <div className="addcourseformfield">
              <label htmlFor="course_name">Course Name</label>
              <input
                type="text"
                name="course_name"
                value={courseData.course_name}
                onChange={handleCourseDataChange}
              />
              {fieldErrors.course_name && (
                <div className="error-message">{fieldErrors.course_name}</div>
              )}
            </div>

            <div className="addcourseformfield">
              <label htmlFor="course_cat">Course Type</label>
              <input
                type="text"
                name="course_cat"
                value={courseData.course_cat}
                onChange={handleCourseDataChange}
              />
              {fieldErrors.course_cat && (
                <div className="error-message">{fieldErrors.course_cat}</div>
              )}
            </div>

            <div className="addcourseformfield">
              <label htmlFor="Batch">Batch</label>
              <input
                type="text"
                name="Batch"
                value={courseData.Batch}
                onChange={handleCourseDataChange}
              />
              {fieldErrors.Batch && (
                <div className="error-message">{fieldErrors.Batch}</div>
              )}
            </div>

            <div className="addcourseformfield">
              <label htmlFor="instructor_name">Instructor Name</label>
              <input
                type="text"
                name="instructor_name"
                value={courseData.instructor_name}
                onChange={handleCourseDataChange}
              />
              {fieldErrors.instructor_name && (
                <div className="error-message">
                  {fieldErrors.instructor_name}
                </div>
              )}
            </div>

            <div className="addcourseformfield">
              <label htmlFor="course_duration">Course Duration</label>
              <input
                type="text"
                name="course_duration"
                value={courseData.course_duration}
                onChange={handleCourseDataChange}
              />
              {fieldErrors.course_duration && (
                <div className="error-message">
                  {fieldErrors.course_duration}
                </div>
              )}
            </div>

            <div className="addcourseformfield">
              <label htmlFor="no_of_classes_in_week">No of Classes</label>
              <input
                type="text"
                name="no_of_classes_in_week"
                value={courseData.no_of_classes_in_week}
                onChange={handleCourseDataChange}
              />
              {fieldErrors.no_of_classes_in_week && (
                <div className="error-message">
                  {fieldErrors.no_of_classes_in_week}
                </div>
              )}
            </div>

            <div className="addcourseformfield">
              <label htmlFor="status">Status</label>
              <select
                defaultValue="inprogress"
                name="status"
                id="status"
                onChange={handleCourseDataChange}
              >
                <option value="inprogress">InProgress</option>
                <option value="will_beStart">Will Be Started</option>
                <option value="completed">Completed</option>
              </select>
              {fieldErrors.status && (
                <div className="error-message">{fieldErrors.status}</div>
              )}
            </div>

            <button className="addcourebuttoncss" type="submit">
              Submit
            </button>
          </form>
        </div>

        <div className="currentcoursesStatContainer">
          {/* ... (other code) */}
        </div>
      </div>
    </div>
  );
};

export default AddNewCoursePage;
