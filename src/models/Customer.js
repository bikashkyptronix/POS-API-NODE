import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
  customer_name: {
    type: String,
    required: true,
    trim: true
  },
  customer_email: {
    type: String,
    required: true,
    trim: true
  },
  customer_mobile: {
    type: String,
    required: true,
    trim: true
  },
  date_of_birth: {
    type: Date,
    default: null
  },
  customer_address: {
    type: String,
    required: true,
    trim: true
  },
  customer_zipcode: {
    type: String,
    required: true,
    trim: true
  },
  customer_points: {
    type: Number,
    default: null,
    min: 0
  },
  sms_email_promotions: {
    type: String,
    enum: ['yes', 'no'],
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

export const Customer = mongoose.model("Customer", customerSchema);