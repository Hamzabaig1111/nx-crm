import React, { useState, useEffect } from "react";
import "../styles/UpdateCoursesPage.css";

import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Header from "../components/Header";
const UpdateCoursesPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const {
    isPending,
    error,
    data: initialCourses,
    refetch,
  } = useQuery({
    queryKey: ["singleCourse"],
    queryFn: () =>
      axios
        .get(`https://crm-lms-sever.vercel.app/api/courses/single/${courseId}`, {
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        }),
  });
  const [Courses, setCourses] = useState(initialCourses);
  console.log(Courses);
  useEffect(() => {
    setCourses(initialCourses);
  }, [initialCourses]);
  const UpdateCourseMutation = useMutation({
    mutationFn: (udpateData) => {
      return axios.put(
        `https://crm-lms-sever.vercel.app/api/courses/${courseId}`,
        udpateData,
        { withCredentials: true }
      );
    },
  });

  const handleUpdate = () => {
    UpdateCourseMutation.mutate(Courses);
    refetch();
  };
  return (
    <div className="UpdateCourseContainer">
      <Header routeName="Update Course" />
      <form onSubmit={handleUpdate} className="uddatecourseFormContainer">
        <div className="formupdateItemcourse">
          <label htmlFor="course_name">Course Name</label>
          <input
            type="text"
            id="course_name"
            name="course_name"
            value={Courses?.course_name}
            onChange={(e) =>
              setCourses({
                ...Courses,
                course_name: e.target.value,
              })
            }
          />
        </div>
        <div className="formupdateItemcourse">
          <label htmlFor="course_cat">Course Category</label>
          <input
            type="text"
            value={Courses?.course_cat}
            id="course_cat"
            name="course_cat"
            onChange={(e) => {
              setCourses({
                ...Courses,
                course_cat: e.target.value,
              });
            }}
          />
        </div>
        <div className="formupdateItemcourse">
          <label htmlFor="Batch">Batch</label>
          <input
            type="text"
            value={Courses?.Batch}
            id="Batch"
            name="Batch"
            onChange={(e) => {
              setCourses({
                ...Courses,
                Batch: e.target.value,
              });
            }}
          />
        </div>
        <div className="formupdateItemcourse">
          <label htmlFor="instructor_name">Instructor Name</label>
          <input
            type="text"
            id="instructor_name"
            name="instructor_name"
            value={Courses?.instructor_name}
            onChange={(e) =>
              setCourses({
                ...Courses,
                instructor_name: e.target.value,
              })
            }
          />
        </div>
        <div className="formupdateItemcourse">
          <label htmlFor="no_of_classes_in_week">No of Classes</label>
          <input
            type="number"
            id="no_of_classes_in_week"
            name="no_of_classes_in_week"
            value={Courses?.no_of_classes_in_week}
            onChange={(e) =>
              setCourses({
                ...Courses,
                no_of_classes_in_week: e.target.value,
              })
            }
          />
        </div>
        <div className="formupdateItemcourse">
          <label htmlFor="no_of_classes_in_week">Status</label>
          <select
            value={Courses?.status}
            onChange={(e) => {
              setCourses({
                ...Courses,
                status: e.target.value,
              });
            }}
            name="status"
            id="status"
            defaultValue="inprogress"
          >
            <option value="will_beStart">Will Be Start</option>
            <option value="completed">Completed</option>
            <option selected value="inprogress">
              InProcess
            </option>
          </select>
        </div>
        {UpdateCourseMutation.isPending ? (
          <div className="myLoader_container">
            <div className="myLoader"></div>
          </div>
        ) : (
          <div className="formupdateItemcourse">
            <button type="button">Update Course</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UpdateCoursesPage;
