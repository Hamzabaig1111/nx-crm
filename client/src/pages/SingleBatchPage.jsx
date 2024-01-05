import React, { useState, useEffect } from "react";
import axios from "../components/BaseURL";
import { useParams } from "react-router-dom";
import Header from '../components/Header';
import '../styles/SingleBadge.css'; // Import your CSS file

const SingleBatchPage = () => {
  const { badgeId } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Make a request to get students in a specific batch (using badgeId)
        const response = await axios.get(
          `/admissions/getstudentswithbatchs?batchName=${badgeId}`
        );

        setStudents(response.data.students);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [badgeId]); // Refetch data when badgeId changes
  console.log(students);

  return (
    <div className="single-batch-container">
        <Header routeName="Batch Report"/>
      <h2 className="batch-heading">Batch: {badgeId}</h2>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error: {error}</div>}

      <table className="students-table">
        <thead>
          <tr>
            <th className="table-header">Student Name</th>
            <th className="table-header">Father Name</th>
            <th className="table-header">Course Name</th>
            <th className="table-header">Batch</th>
            <th className="table-header">Course Duration</th>
            <th className="table-header">Course Category</th>
            <th className="table-header">Phone</th>
            
            {/* Add more columns based on your data structure */}
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id} className="table-row">
              <td className="table-data">{student.student_name}</td>
              <td className="table-data">{student.father_name}</td>
              <td className="table-data">{student.course_name}</td>
              <td className="table-data">{student.std_batch}</td>
              <td className="table-data">{student.course_duration}</td>
              <td className="table-data">{student.course_category}</td>
              <td className="table-data">{student.phone}</td>
              {/* Add more columns based on your data structure */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SingleBatchPage;
