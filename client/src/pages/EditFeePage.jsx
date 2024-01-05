import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import "../styles/EditFeePage.css";

const EditFeePage = () => {
  const { feeId } = useParams();

  const { data: initialFeeData, refetch } = useQuery({
    queryKey: ["SingleFeeRecord", feeId],
    queryFn: () =>
      axios
        .get(`https://crm-lms-sever.vercel.app/api/feerecord/single/${feeId}`, {
          withCredentials: true,
        })
        .then((res) => res.data),
  });

  const EditFeePageMutation = useMutation({
    mutationFn: (updateData) => {
      return axios.put(
        `https://crm-lms-sever.vercel.app/api/feerecord/${feeId}`,
        updateData,
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      refetch();
      // Reset the loading state and update the button text after successful update
      setUpdateLoading(false);
      setUpdateButtonText("Update Fee Record");
    },
    onError: (error) => {
      console.error("Error updating fee record:", error);
      // Add logic to display an error message to the user
      setUpdateLoading(false);
      setUpdateButtonText("Update Fee Record");
    },
  });

  const [feeData, setFeeData] = useState(initialFeeData);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateButtonText, setUpdateButtonText] = useState("Update Fee Record");

  useEffect(() => {
    // Update feeData if initialFeeData is available
    if (initialFeeData) {
      setFeeData(initialFeeData);
    }
  }, [initialFeeData]);

  const handleCheckboxChange = (index) => {
    setSelectedCheckboxes((prevCheckboxes) => {
      const updatedCheckboxes = [...prevCheckboxes];
      updatedCheckboxes[index] = !updatedCheckboxes[index];
      return updatedCheckboxes;
    });
  };

  const handleUpdate = () => {
    setUpdateLoading(true);
    setUpdateButtonText("Updating...");
  
    const updatedNextInstallments = feeData?.next_installments?.map(
      (installment, index) => {
        if (selectedCheckboxes[index]) {
          return { ...installment, status: "paid" };
        }
        return installment;
      }
    );
  
    const paidInstallmentsSum = updatedNextInstallments
      ?.filter((installment) => installment.status === "paid")
      ?.reduce((sum, installment) => sum + installment.fee, 0);
  
    const remainingInstallments = feeData.no_of_installments - selectedCheckboxes.filter(Boolean).length;
    const updatedData = {
      ...feeData,
      next_installments: updatedNextInstallments,
      updated_received_fee: feeData.fee_on_admission_received + paidInstallmentsSum,
      updated_receivable_fee: feeData.total_course_fee - (feeData.fee_on_admission_received + paidInstallmentsSum),
      updated_no_of_installments: remainingInstallments,
    };
  
    EditFeePageMutation.mutate(updatedData);
  };
  

  return (
    <div className="EditFeePageContainer">
      <Header routeName="Fee Record Update " />
      <div className="updateFormAgentContainer">
        <form>
          {feeData?.next_installments?.map((installment, index) => (
            <div className="editcheckbox" key={index}>
              <label>
                Installment {installment.month} - Due Date:{" "}
                {new Date(installment.due_date).toLocaleDateString()} - Fee:{" "}
                {installment.fee}
              </label>
              <input
                type="checkbox"
                checked={selectedCheckboxes[index]}
                onChange={() => handleCheckboxChange(index)}
              />
            </div>
          ))}

          <button type="button" onClick={handleUpdate} disabled={updateLoading}>
            {updateLoading ? "Updating..." : "Update Fee Record"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditFeePage;
