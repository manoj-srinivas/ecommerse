import { StatusCode } from "../helpers/constants.js";
import {
  responseError,
  responseFailure,
  responseSuccess,
} from "../helpers/response.js";
import {
  addAddressService,
  addPaymentService,
  updateAddressService,
  updateCustomerService,
  updatePasswordService,
  updatePaymentService,
} from "../services/customer.service.js";
import {
  addPaymentSchema,
  addressSchemaValidations,
  getItemSchema,
  updateAddressSchemaValidations,
  updateCustomerSchema,
  updatePasswordSchema,
  updatePaymentSchema,
} from "../../validations.js";

export const addAddress = async (req, res) => {
  try {
    const { error, value } = addressSchemaValidations.validate(req.body);
    if (error) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, error);
    } else {
      const data = await addAddressService(req);
      if (data) {
        responseSuccess(
          req,
          res,
          "Data updated successfully",
          StatusCode.OK,
          data
        );
      } else {
        responseFailure(
          req,
          res,
          "Unable to update data",
          StatusCode.NOT_FOUND,
          null
        );
      }
    }
  } catch (error) {
    console.log(error);
    responseError(res, error, StatusCode.NOT_FOUND);
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { error, value } = updateAddressSchemaValidations.validate(req.body);
    if (error) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, error);
    } else {
      const data = await updateAddressService(req);
      if (data) {
        responseSuccess(
          req,
          res,
          "Data updated successfully",
          StatusCode.OK,
          data
        );
      } else {
        responseFailure(
          req,
          res,
          "Unable to update data",
          StatusCode.NOT_FOUND,
          null
        );
      }
    }
  } catch (error) {
    console.log(error);
    responseError(res, error, StatusCode.NOT_FOUND);
  }
};

export const addPayment = async (req, res) => {
  try {
    const { error, value } = addPaymentSchema.validate(req.body);
    if (error) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, error);
    } else {
      const data = await addPaymentService(req);
      if (data) {
        responseSuccess(
          req,
          res,
          "Data updated successfully",
          StatusCode.OK,
          data
        );
      } else {
        responseFailure(
          req,
          res,
          "Unable to update data",
          StatusCode.NOT_FOUND,
          null
        );
      }
    }
  } catch (error) {
    console.log(error);
    responseError(res, error, StatusCode.NOT_FOUND);
  }
};

export const updatePayment = async (req, res) => {
  try {
    const { error, value } = updatePaymentSchema.validate(req.body);
    if (error) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, error);
    } else {
      const data = await updatePaymentService(req);
      if (data) {
        responseSuccess(
          req,
          res,
          "Data updated successfully",
          StatusCode.OK,
          data
        );
      } else {
        responseFailure(
          req,
          res,
          "Unable to update data",
          StatusCode.NOT_FOUND,
          null
        );
      }
    }
  } catch (error) {
    console.log(error);
    responseError(res, error, StatusCode.NOT_FOUND);
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const { error, value } = updateCustomerSchema.validate(req.body);
    if (error) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, error);
    } else {
      const data = await updateCustomerService(req);
      console.log("data ====== ", data);

      if (data && !data.error && data.data) {
        responseSuccess(
          req,
          res,
          "Data updated successfully",
          StatusCode.OK,
          data.data
        );
      } else {
        responseFailure(
          req,
          res,
          "Unable to update data",
          StatusCode.NOT_FOUND,
          data.message
        );
      }
    }
  } catch (error) {
    console.log(error);
    responseError(res, error, StatusCode.NOT_FOUND);
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { error, value } = updatePasswordSchema.validate(req.body);
    if (error) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, error);
    } else {
      const data = await updatePasswordService(req);
      if (data && !data.error && data.data) {
        responseSuccess(
          req,
          res,
          "Data updated successfully",
          StatusCode.OK,
          data.data
        );
      } else {
        responseFailure(
          req,
          res,
          "Unable to update data",
          StatusCode.NOT_FOUND,
          data.message
        );
      }
    }
  } catch (error) {
    console.log(error);
    responseError(res, error, StatusCode.NOT_FOUND);
  }
};
