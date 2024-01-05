import React from "react";
import Header from "../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import FeeLoadingSkeleton from "../components/LoadingSkelton";
import "../styles/Feepage.css";
import Popup from "reactjs-popup";

const Feepage = () => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["courseData"],
    queryFn: () =>
      axios
        .get("https://crm-lms-sever.vercel.app/api/feerecord/", {
          withCredentials: true,
        })
        .then((res) => {
          return res.data.reverse();
        }),
  });

  const deleteMutationFn = useMutation({
    mutationFn: (feeId) => {
      return axios.delete(
        `https://crm-lms-sever.vercel.app/api/feerecord/${feeId}`,
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      refetch();
    },
  });

  const handleDeleteFeeRecord = (id) => {
    console.log(id);
    deleteMutationFn.mutate(id);
  };

  console.log(data);
  // Made some changes
  return (
    <div className="FeesContainer">
      <Header routeName="Fees" />
      <div className="FeesContentContainer">
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
        {isPending ? (
          <div className="loeading">
            <FeeLoadingSkeleton />
          </div>
        ) : error ? (
          "An Error Occurred"
        ) : (
          <div className="FeeTableContainer">
            <table className="myFeeTable">
              <thead>
                <tr>
                  <th className="feetableth">Student Name</th>
                  <th className="feetableth">Agent Name</th>
                  <th className="feetableth">Total Fee</th>
                  <th className="feetableth">Received Fee</th>
                  <th className="feetableth">Pending Fee</th>
                  <th className="feetableth">Next Month Installment</th>
                  <th className="feetableth">Number of Installments</th>
                  <th className="feetableth">Installments Dates</th>
                  <th className="feetableth">Status</th>
                  <th className="feetableth">Update</th>
                  <th className="feetableth">Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((feerecord) => (
                  <tr className="table-row-fee" key={feerecord._id}>
                    <td className="table-data-fee">{feerecord.std_name}</td>
                    <td className="table-data-fee">{feerecord.agent_name}</td>
                    <td className="table-data-fee">
                      {feerecord.total_course_fee}
                    </td>
                    <td className="table-data-fee">
                      {feerecord.fee_on_admission_received}
                    </td>
                    <td className="table-data-fee">
                      {feerecord.updated_receivable_fee?.toFixed(2)}
                    </td>
                    <td className="table-data-fee">
                      {feerecord?.next_installments[0]?.fee}
                    </td>
                    <td className="table-data-fee">
                      {feerecord.updated_no_of_installments}
                    </td>
                    <td className="table-data-fee">
                      <ul className="myfeeUL">
                        {feerecord.next_installments?.map((installment) => (
                          <li key={installment._id}>
                            {new Date(installment.due_date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="table-data-fee">{feerecord.status}</td>{" "}
                    <td className="table-data-fee">
                      <Link to={`/fee/${feerecord._id}`}>
                        <PencilSquareIcon className="TableIcon" />
                      </Link>
                    </td>
                    <td className="table-data-fee">
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
                                onClick={() =>
                                  handleDeleteFeeRecord(feerecord._id)
                                }
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

export default Feepage;
