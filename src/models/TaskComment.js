import mongoose from "mongoose";

const taskCommentSchema = new mongoose.Schema(
  {
    task_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmployeeTask", // or "Employee" depending on your collection name
      required: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // optional reference to admin/manager
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

export const TaskComment = mongoose.model("TaskComment", taskCommentSchema);