import customersModel from "../models/customers.model.js";
import mongodb from "mongodb";

export const addAddressService = async (req) => {
  const { customer_code, company_code } = req.params;

  console.log(req.params);

  if (req.body.is_default_address == true) {
    await unSetDefaultAddress(customer_code, company_code);
  }

  const customerDetails = await customersModel.updateOne(
    { customer_code: customer_code, status: "active", company_code },
    { $push: { address: req.body } }
  );

  return customerDetails;
};

const unSetDefaultAddress = async (customer_code, company_code) => {
  const customerDetails = await customersModel.findOne({
    customer_code: customer_code,
    status: "active",
    company_code,
  });
  if (customerDetails) {
    customerDetails.address.map((e) => {
      e.is_default_address = false;
    });
    console.log(customerDetails);
    await customerDetails.save();
  }
};

export const updateAddressService = async (req) => {
  const { customer_code, company_code, address_code } = req.params;
  const ObjectId = mongodb.ObjectId;
  const dynamicFields = {};

  Object.keys(req.body).forEach((key) => {
    const value = req.body[key];
    dynamicFields[`address.$.${key}`] = value;
  });

  if (req.body.is_default_address && req.body.is_default_address == true) {
    await unSetDefaultAddress(customer_code, company_code);
  }

  const customerDetails = await customersModel.updateOne(
    {
      customer_code: customer_code,
      status: "active",
      company_code,
      "address._id": new ObjectId(address_code),
    },
    { $set: dynamicFields }
  );

  return customerDetails;
};

export const addPaymentService = async (req) => {
  const { customer_code, company_code } = req.params;

  const customerDetails = await customersModel.updateOne(
    {
      customer_code: customer_code,
      status: "active",
      company_code,
      "payment.card_number": { $ne: req.body.card_number },
    },
    { $push: { payment: req.body } }
  );

  return customerDetails;
};

export const updatePaymentService = async (req) => {
  const { customer_code, company_code, payment_code } = req.params;
  const dynamicFields = {};

  const ObjectId = mongodb.ObjectId;

  Object.keys(req.body).forEach((key) => {
    const value = req.body[key];
    dynamicFields[`payment.$.${key}`] = value;
  });

  const findQuery = {
    customer_code: customer_code,
    status: "active",
    company_code,
    "payment._id": new ObjectId(payment_code),
  };

  const customerDetails = await customersModel.updateOne(findQuery, {
    $set: dynamicFields,
  });

  return customerDetails;
};

export const updateCustomerService = async (req) => {
  const { customer_code, company_code } = req.params;

  if (
    req.body.email &&
    (await customersModel.findOne({
      email: req.body.email,
      company_code,
      customer_code: { $ne: customer_code },
    }))
  ) {
    return { error: true, message: "Email id is already in use" };
  }

  if (
    req.body.phone_number &&
    (await customersModel.findOne({
      phone_number: req.body.phone_number,
      company_code,
      customer_code: { $ne: customer_code },
    }))
  ) {
    return { error: true, message: "Phone number is already in use" };
  }

  const customerDetails = await customersModel.updateOne(
    { customer_code: customer_code, company_code },
    {
      $set: req.body,
    }
  );

  return { error: false, data: customerDetails };
};

export const updatePasswordService = async (req) => {
  const { customer_code, company_code } = req.params;

  if (
    req.body.password &&
    (await customersModel.findOne({
      password: req.body.password,
      company_code,
      customer_code: customer_code,
    }))
  ) {
    return { error: true, message: "Password already in use" };
  }

  if (
    req.body.password &&
    (await customersModel.findOne({
      password: req.body.password,
      company_code,
      customer_code: { $ne: customer_code },
    }))
  ) {
    return { error: true, message: "Cannot use this password" };
  }

  const customerDetails = await customersModel.updateOne(
    {
      customer_code: customer_code,
      company_code,
      password: req.body.existing_password,
    },
    {
      $set: { password: req.body.password },
    }
  );

  console.log(customerDetails);

  return customerDetails.modifiedCount > 0
    ? { error: false, data: customerDetails }
    : { error: true, message: "Invalid Credentials" };
};
