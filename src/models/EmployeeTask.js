import mongoose from "mongoose";

const employeeTaskSchema = new mongoose.Schema(
  {
    employee_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // or "Employee" depending on your collection name
      required: true,
    },
    task_title: {
      type: String,
      required: true,
      trim: true,
    },
    task_details: {
      type: String,
      required: true,
      trim: true,
    },
    task_deadline: {
      type: Date,
      default: null,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // optional reference to admin/manager
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "in-active"],
      default: "active",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

export const EmployeeTask = mongoose.model("EmployeeTask", employeeTaskSchema);