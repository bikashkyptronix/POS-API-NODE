import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
  employee_name: {
    type: String,
    required: true,
    trim: true
  },
  employee_email: {
    type: String,
    required: true,
    trim: true
  },
  employee_password: {
    type: String,
    required: true,
  },
  employee_mobile: {
    type: String,
    required: true,
    trim: true
  },
  date_of_birth: {
    type: Date,
    default: null
  },
  employee_address: {
    type: String,
    required: true,
    trim: true
  },
  employee_zipcode: {
    type: String,
    required: true,
    trim: true
  },
  employee_photo: {
    type: String,
    default: null
  },
  employee_aadhar: {
    type: String,
    default: null
  },
  business_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
    default: null,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
}
);

export const Employee = mongoose.model("Employee", employeeSchema);