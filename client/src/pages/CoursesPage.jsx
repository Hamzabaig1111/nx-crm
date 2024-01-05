import React from "react";
import Header from "../components/Header";
import "../styles/CoursesPage.css";
import {
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import axios from "../components/BaseURL";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import FeeLoadingSkeleton from "../components/LoadingSkelton";
import Popup from "reactjs-popup";
const CoursesPage = () => {
  const { isPending, refetch, error, data } = useQuery({
    queryKey: ["courseData"],
    queryFn: () =>
      axios
        .get("/courses/", { withCredentials: true })
        .then((res) => {
          return res.data;
        }),
  });
  const deleteMutationFn = useMutation({
    mutationFn: (courseId) => {
      return axios.delete(`/courses/${courseId}`);
    },
    onSuccess: () => {
      refetch();
    },
  });
  const handleDeleteCourse = (id) => {
    console.log(id);
    deleteMutationFn.mutate(id);
  };
  return (
    <div className="CoursesContainer">
      <Header routeName="Courses" />
      <div className="CoursesContentContainer">
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
        <div className="addCourseContainer">
          <Link to="/addnewcourse">
            <button>Add a Course</button>
          </Link>
        </div>
        {isPending ? (
          <div className="loeading">
            <FeeLoadingSkeleton />
          </div>
        ) : error ? (
          "An Error Occured"
        ) : (
          <div className="coursesTableContainer">
            <table className="mycoursesTable">
              <thead>
                <tr>
                  <th className="table-header-couurses">Course-Name</th>
                  <th className="table-header-couurses">Course-Type</th>
                  <th className="table-header-couurses">Batch-Name</th>
                  <th className="table-header-couurses">Instructor-Name</th>
                  <th className="table-header-couurses">Course-Duration</th>
                  <th className="table-header-couurses">No of Classes</th>
                  <th className="table-header-couurses">Status</th>
                  <th className="table-header-couurses">update</th>
                  <th className="table-header-couurses">Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((course) => (
                  <tr className="table-row-courses" key={course._id}>
                    <td className="table-data-courses">{course.course_name}</td>
                    <td className="table-data-courses">{course.course_cat}</td>
                    <td className="table-data-courses">{course.Batch}</td>
                    <td className="table-data-courses">
                      {course.instructor_name}
                    </td>
                    <td className="table-data-courses">
                      {course.course_duration}
                    </td>
                    <td className="table-data-courses">
                      {course.no_of_classes_in_week}
                    </td>
                    <td className="table-data-courses">{course.status}</td>
                    <td className="table-data-courses">
                      <Link to={`/updatecourse/${course._id}`}>
                        <PencilSquareIcon className="TableIcon" />
                      </Link>
                    </td>
                    <td className="table-data-courses">
                      <Popup
                        trigger={<TrashIcon className="TableIcon" />}
                        modal
                        nested
                      >
                        {(close) => (
                          <div className="modal">
                            <button className="close" onClick={close}>
                              <XMarkIcon className="myXIcon" />
                            </button>
                            <div className="headerTitle">
                              <h2>Are you sure to delete</h2>
                            </div>
                            <div className="actions">
                              <button
                                className="button"
                                onClick={() => handleDeleteCourse(course._id)}
                              >
                                {" "}
                                Delete{" "}
                              </button>
                              <button
                                className="button"
                                onClick={() => {
                                  console.log("modal closed ");
                                  close();
                                }}
                              >
                                Discard
                              </button>
                            </div>
                          </div>
                        )}
                      </Popup>
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

export default CoursesPage;
