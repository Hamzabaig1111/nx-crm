import mongoose from "mongoose";

const { Schema } = mongoose;

const feeRecordSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "AgentRecord", // Reference to the Agent model
      required: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "AdmissionRecord",
      required: true,
    },
    std_name: {
      type: String,
      required: true,
    },
    std_cnic: {
      type: String,
      required: true,
    },
    std_coursename: {
      type: String,
      required: true,
    },
    agent_name: {
      type: String,
      required: true,
    },
    agent_branch: {
      type: String,
      required: true,
    },
    std_courseduration: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Paid", "Installment"],
      default: "Installment",
    },
    std_batch: {
      type: String,
      required: true,
    },
    std_feetype: {
      type: String,
      required: true,
    },
    total_course_fee: {
      type: Number,
      required: true,
    },
    fee_on_admission_received: {
      type: Number,
      required: true,
    },
    remaining_fee: {
      type: Number,
      default: function () {
        return this.total_course_fee - this.fee_on_admission_received;
      },
    },
    no_of_installments: {
      type: Number,
      required: true,
    },
    next_installments: [
      {
        month: Number,
        due_date: Date,
        fee: Number,
        status: {
          type: String,
          enum: ["unpaid", "paid"],
          default: "unpaid",
        },
      },
    ],
    updated_received_fee: {
      type: Number,
      default: function () {
        return this.fee_on_admission_received;
      },
    },
    updated_receivable_fee: {
      type: Number,
      default: function () {
        return this.total_course_fee - this.updated_received_fee;
      },
    },
    updated_no_of_installments: {
      type: Number,
      default: function () {
        return this.no_of_installments;
      },
    },
    admin_updated_monthly_fee: {
      type: Number,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Pre-save hook to calculate next installments
feeRecordSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("no_of_installments")) {
    const remainingInstallments =
      this.no_of_installments - this.next_installments.length;
    const installmentFee = this.remaining_fee / remainingInstallments;
    const currentMnth = new Date().getMonth();
    for (let i = 1; i <= remainingInstallments; i++) {
      // Calculate the next month and year
      const nextMonth = (currentMnth + i) % 12;
      const nextYear =
        Math.floor((currentMnth + i) / 12) + new Date().getFullYear();

      // Get the month name
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const monthName = monthNames[nextMonth];

      // Calculate the due date
      const dueDate = new Date(nextYear, nextMonth, 1);

      const installment = {
        month: monthName,
        due_date: dueDate,
        fee: installmentFee,
      };

      this.next_installments.push(installment);
    }
  }

  next();
});

export default mongoose.model("FeeRecord", feeRecordSchema);
