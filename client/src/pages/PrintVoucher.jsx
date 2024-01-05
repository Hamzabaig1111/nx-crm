import React from "react";
import "../styles/PrintVoucher.css";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "../components/BaseURL";
import Header from "../components/Header";
const PrintVoucher = () => {
  const { receiptId } = useParams();
  console.log(receiptId);
  const {
    isPending: admissionPending,
    error: admissionError,
    data: admissionData,
    refetch: admissionRefetch,
  } = useQuery({
    queryKey: ["admissionData"],
    queryFn: () =>
      axios
        .get(`/admissions/${receiptId}`, {
          withCredentials: true,
        })
        .then((res) => res?.data),
  });

  const {
    isPending: feeRecordPending,
    error: feeRecordError,
    data: feeRecordData,
    refetch: feeRecordRefetch,
  } = useQuery({
    queryKey: ["feeRecordData"],
    queryFn: () =>
      axios
        .get(`/feerecord/${receiptId}`, {
          withCredentials: true,
        })
        .then((res) => res?.data),
  });
  const handleClickPrint = () => {
    window.print();
  };
  const nextInstallmentDue = feeRecordData?.next_installments[0]?.due_date;
  const formattedDate = nextInstallmentDue
    ? new Date(nextInstallmentDue).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : "";

  console.log(feeRecordData);
  if (admissionPending || feeRecordPending) return <div>Loading....</div>;
  if (admissionError || feeRecordError)
    return <div>Error: {admissionError || feeRecordError}</div>;
  // Expected output: "12/20/2020"
  return (
    <div className="printvochContainer">
      <Header routeName="Print Voucher" />
      <div className="printContinaer">
        <button onClick={handleClickPrint}>Print</button>
      </div>
      <div id="print-section" className="vochermainContainer">
        <div class="row">
          <div class="column">
            <div className="loginnexContainer">
              <img src="/assets/logp.png" alt="" />
            </div>
            <div class="d-flex justify-content-between">
              <strong>Invoice # NEX/2023/________</strong>
              <strong>Office Copy</strong>
            </div>
            <div
              style={{ paddingBottom: 10, paddingTop: 10 }}
              class="d-flex flex-col justify-content-center"
            >
              <h4 class="align-center title">NexSkill Pvt. Ltd.</h4>
            </div>
            <div class="d-flex justify-content-between">
              <div class="d-flex flex-col">
                <span>Print Date:</span>
                <span>08/09/2022</span>
              </div>
              <div class="d-flex flex-col">
                <span>Date Admission</span>
                <span>08/09/2022</span>
              </div>
            </div>
            <div className="studntDetail">
              <div className="studentdetailentry">
                <label htmlFor="">Student Name</label>
                <p>{admissionData?.student_name}</p>
              </div>
              <div className="studentdetailentry">
                <label htmlFor="">Faterh Name</label>
                <p>{admissionData?.father_name}</p>
              </div>
              <div className="studentdetailentry">
                <label htmlFor="">Student CNIC</label>
                <p>{admissionData?.CNIC}</p>
              </div>
              <div className="studentdetailentry">
                <label htmlFor="">Course Name</label>
                <p>{admissionData?.course_name}</p>
              </div>
              <div className="studentdetailentry">
                <label htmlFor="">Payment Status</label>
                <p>{feeRecordData?.status}</p>
              </div>
              <div className="studentdetailentry">
                <label htmlFor="">Received Fee</label>
                <p>{feeRecordData?.fee_on_admission_received}</p>
              </div>
              <div className="studentdetailentry">
                <label htmlFor="">No of Installments</label>
                <p>{feeRecordData?.no_of_installments}</p>
              </div>
              <div className="studentdetailentry">
                <label htmlFor="">Remaining Installments</label>
                <p>{feeRecordData?.updated_no_of_installments}</p>
              </div>
              <div className="studentdetailentry">
                <label htmlFor="">Course Fee</label>
                <p>{admissionData?.course_fee}</p>
              </div>
              <div className="studentdetailentry">
                <label htmlFor="">Batch No</label>
                <p>{admissionData?.std_batch}</p>
              </div>
              <div className="studentdetailentry">
                <label htmlFor="">Branch Name</label>
                <p>Arfa Kareen</p>
              </div>
            </div>
            <table className="vocherTable_main">
              <thead>
                <tr>
                  <th scope="col left" colspan="2">
                    Description
                  </th>
                  <th scope="col right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Account" colspan="2">
                    Previously Received
                  </td>
                  <td data-label="Amount">
                    {feeRecordData?.updated_received_fee?.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td data-label="Account" colspan="2">
                    Next Month Installment
                  </td>
                  <td data-label="Amount">
                    {feeRecordData?.next_installments[0]?.fee}
                  </td>
                </tr>
                <tr>
                  <td scope="row" data-label="Account" colspan="2">
                    Total Course Fee Received
                  </td>
                  <td data-label="Amount">
                    {feeRecordData?.updated_received_fee?.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td scope="row" data-label="Account" colspan="2">
                    Total Pending Fee
                  </td>
                  <td data-label="Amount">
                    {feeRecordData?.updated_receivable_fee?.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
            <hr />
            <div class="d-flex justify-content-between">
              <strong>Due Date:</strong>
              <span>{formattedDate}</span>
            </div>
            <hr />
            <div class="d-flex justify-content-between">
              <strong>Total Pending Fee After Installments Payment</strong>
              <span>
                Rs: {feeRecordData?.updated_receivable_fee?.toFixed(2)}
              </span>
            </div>
            <br />
            <hr />
            <div class="d-flex flex-col">
              <span style={{ fontWeight: "bold", marginBottom: 5 }}>
                Payment Type
              </span>
              <span>Cash / Online</span>
            </div>
            <br />
            <div class="d-flex flex-col float-right">
              <span>Signature and Stamp</span>
              <span>{admissionData?.agentSignatureStamp}</span>
            </div>
            <br />
            <br />
          </div>
          <div class="column">
            <div className="loginnexContainer">
              <img src="/assets/logp.png" alt="" />
            </div>
            <div class="d-flex justify-content-between">
              <strong>Invoice # NEX/2023/________</strong>
              <strong>Student Copy</strong>
            </div>
            <div
              style={{ paddingBottom: 10, paddingTop: 10 }}
              class="d-flex flex-col justify-content-center"
            >
              <h4 class="align-center title">NexSkill Pvt. Ltd.</h4>
            </div>
            <div class="d-flex justify-content-between">
              <div class="d-flex flex-col">
                <span>Print Date:</span>
                <span>08/09/2022</span>
              </div>
              <div class="d-flex flex-col">
                <span>Date Admission</span>
                <span>08/09/2022</span>
              </div>
            </div>
            <div className="studntDetail">
              <div className="studentdetailentry">
                <label htmlFor="">Student Name</label>
                <p>{admissionData?.student_name}</p>
              </div>
              <div className="studentdetailentry">
                <label htmlFor="">Faterh Name</label>
                <p>{admissionData?.father_name}</p>
              </div>
              <div className="studentdetailentry">
                <label htmlFor="">Student CNIC</label>
                <p>{admissionData?.CNIC}</p>
              </div>
              <div className="studentdetailentry">
                <label htmlFor="">Course Name</label>
                <p>{admissionData?.course_name}</p>
              </div>
              <div className="studentdetailentry">
                <label htmlFor="">Payment Status</label>
                <p>{feeRecordData?.status}</p>
              </div>
              <div className="studentdetailentry">
                <label htmlFor="">Received Fee</label>
                <p>{feeRecordData?.updated_received_fee?.toFixed(2)}</p>
              </div>
              <div className="studentdetailentry">
                <label htmlFor="">No of Installments</label>
                <p>{feeRecordData?.no_of_installments}</p>
              </div>
              <div className="studentdetailentry">
                <label htmlFor="">Remaining Installments</label>
                <p>{feeRecordData?.updated_no_of_installments}</p>
              </div>
              <div className="studentdetailentry">
                <label htmlFor="">Course Fee</label>
                <p>{admissionData?.course_fee}</p>
              </div>
              <div className="studentdetailentry">
                <label htmlFor="">Batch No</label>
                <p>{admissionData?.std_batch}</p>
              </div>
              <div className="studentdetailentry">
                <label htmlFor="">Branch Name</label>
                <p>Arfa Kareen</p>
              </div>
            </div>
            <table className="vocherTable_main">
              <thead>
                <tr>
                  <th scope="col left" colspan="2">
                    Description
                  </th>
                  <th scope="col right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Account" colspan="2">
                    Previously Received
                  </td>
                  <td data-label="Amount">
                    {feeRecordData?.fee_on_admission_received}
                  </td>
                </tr>
                <tr>
                  <td data-label="Account" colspan="2">
                    Next Month Installment
                  </td>
                  <td data-label="Amount">
                    {feeRecordData?.next_installments[0]?.fee}
                  </td>
                </tr>
                <tr>
                  <td scope="row" data-label="Account" colspan="2">
                    Total Course Fee Received
                  </td>
                  <td data-label="Amount">
                    {feeRecordData?.updated_received_fee?.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td scope="row" data-label="Account" colspan="2">
                    Total Pending Fee
                  </td>
                  <td data-label="Amount">
                    {feeRecordData?.updated_receivable_fee?.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
            <hr />
            <div class="d-flex justify-content-between">
              <strong>Due Date:</strong>
              <span>{formattedDate}</span>
            </div>
            <hr />
            <div class="d-flex justify-content-between">
              <strong>Total Pending Fee After Installments Payment</strong>
              <span>
                Rs: {feeRecordData?.updated_receivable_fee?.toFixed(2)}
              </span>
            </div>
            <br />
            <hr />
            <div class="d-flex flex-col">
              <span style={{ fontWeight: "bold", marginBottom: 5 }}>
                Payment Type
              </span>
              <span>Cash / Online</span>
            </div>
            <br />
            <div class="d-flex flex-col float-right">
              <span>Signature and Stamp</span>
              <span className="digital_signature">{admissionData?.agentSignatureStamp}</span>
            </div>
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintVoucher;
