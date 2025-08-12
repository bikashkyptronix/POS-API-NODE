import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { Customer } from "../../../models/Customer.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";
import mongoose from 'mongoose';

/**
 * getCustomerUpdate
 * customer details update
 * @param req
 * @param res
 * @param next
 */

export const getCustomerUpdate = async (req, res, next) => {
  try {
    const customerId = req.params.id;
    const {
      customer_name,
      customer_email,
      customer_mobile,
      date_of_birth,
      customer_address,
      customer_zipcode,
      customer_points,
      sms_email_promotions,
      status
    } = req.body;

    // Check if Customer exists
    const customerDetails = await Customer.findById(customerId);
    if (!customerDetails) {
      throw StatusError.notFound("Customer not found");
    }

    // Check if another user already uses this email
    const existingEmailUser = await Customer.findOne({
      customer_email,
      _id: { $ne: customerId } // Exclude current user from duplicate check
    });
    if (existingEmailUser) {
      throw StatusError.badRequest("This email is already registered");
    }

    // Check for duplicate phone number (excluding current user)
    const existingPhoneUser = await Customer.findOne({
      customer_mobile,
      _id: { $ne: customerId }
    });
    if (existingPhoneUser) {
      throw StatusError.badRequest("This phone number is already registered");
    }

    // Update fields
    customerDetails.customer_name = customer_name;
    customerDetails.customer_email = customer_email;
    customerDetails.customer_mobile = customer_mobile;
    customerDetails.date_of_birth = date_of_birth;
    customerDetails.customer_address = customer_address;
    customerDetails.customer_zipcode = customer_zipcode;
    customerDetails.customer_points = customer_points;
    customerDetails.sms_email_promotions = sms_email_promotions;
    customerDetails.status = status;
    customerDetails.updated_by = req.userDetails.userId;

    const updatedCustomer = await customerDetails.save();

    res.ok({
      message: "Customer updated successfully",
      customerDetails: updatedCustomer,
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};