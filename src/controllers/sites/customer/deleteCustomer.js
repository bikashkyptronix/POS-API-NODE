import { Customer } from "../../../models/Customer.js";

export const deleteCustomer = async (req, res, next) => {
  try {
    const customerId = req.params.id;

    const customer = await Customer.findOne({
      _id: customerId,
      status: "active",
      business_id: req.userDetails.business_id
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    customer.status = "inactive";
    customer.updated_by = req.userDetails.userId;
    await customer.save();

    return res.ok({
      message: "Customer deleted successfully",
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};