import { StatusCode } from "../helpers/constants.js";
import {
  responseError,
  responseFailure,
  responseSuccess,
} from "../helpers/response.js";
import { createSuppliers, getAllSuppliers, editSuppliersService, deleteSuppliersService } from "../services/suppliers.services.js";
import { supplierSchema, getsupplierSchema,editSupplierSchema, deleteSupplierSchema } from "../../validations.js";

export const addSuppliers = async (req, res) => {
  try {
    const { error, value } = supplierSchema.validate(req.body);
    if (error) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, error);
    } else {
      const data = await createSuppliers(req.body, req.body); 
      responseSuccess(
        req,
        res,
        "Data added successfully",
        StatusCode.OK,
        data
      );
    }
  } catch (error) {
    responseError(res, error.status_code || 500, error.message || "Internal Server Error", error.error || null);
  }
};



export const getSuppliers = async (req, res) => {
  try {
    const { error, value } = getsupplierSchema.validate(req.query);
    if (error) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, error);
    } else {
      const data = await getAllSuppliers(req.query.company_code); 
      if (data.length > 0) {
        responseSuccess(
          req,
          res,
          "Data retrieved successfully",
          StatusCode.OK,
          data
        );
      } else {
        responseFailure(
          req,
          res,
          "Unable to retrieve data",
          StatusCode.NOT_FOUND,
          null
        );
      }
    }
  } catch (error) {
    console.log(error);
    responseError(res, error, StatusCode.INTERNAL_SERVER_ERROR);
  }
};

export const editSuppliers = async (req, res) => {
  try {
    const email = req.query.email;
    console.log("emailemailemail", email);
    const newData = req.body;
    const { error, value } = editSupplierSchema.validate(req.body);
    if (error) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, error);
    } else {
      const updatedSupplier = await editSuppliersService(email, newData);
      if (updatedSupplier) {
        responseSuccess(
          req,
          res,
          "Supplier updated successfully",
          StatusCode.OK,
          updatedSupplier
        );
      } else {
        responseFailure(
          req,
          res,
          "Supplier not found",
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


export const deleteSuppliers = async (req, res) => {
  try {
    const email = req.query.email;
    const status = req.body;
    // const { error, value } = deleteSupplierSchema.validate(req.body);
    // if (error) {
    //   responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, error);
    // } else {
      const updatedItem = await deleteSuppliersService(email, status);
      if (updatedItem) {
        responseSuccess(
          req,
          res,
          "Data added successfully",
          StatusCode.OK,
          updatedItem
        );
      } else {
        responseFailure(
          req,
          res,
          "Unable to add data",
          StatusCode.NOT_FOUND,
          null
        );
      }
    // }
  } catch (error) {
    console.log(error);
    responseError(res, error, StatusCode.NOT_FOUND);
  }
};

