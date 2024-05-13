import { StatusCode } from "../helpers/constants.js";
import {
  responseError,
  responseFailure,
  responseSuccess,
} from "../helpers/response.js";
import { creatOrderService, getOrderService, getSingleOrderService, deleteOrderService, } from "../services/order.service.js";
import { getItemSchema, getSingleOrderSchema, } from "../../validations.js";

export const createOrder = async (req, res) => {
  try {
    const { error, value } = getItemSchema.validate(req.query);
    if (false) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, error);
    } else {
      const data = await creatOrderService(req);
      if (data) {
        responseSuccess(
          req,
          res,
          "Data added successfully",
          StatusCode.OK,
          data
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
    }
  } catch (error) {
    console.log(error);
    responseError(res, error, StatusCode.NOT_FOUND);
  }
};

export const getOrder = async (req, res) => {
  try {
    const { error, value } = getItemSchema.validate(req.query);
    if (false) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, error);

    } else {
      const data = await getOrderService(req);
      if (data) {
        responseSuccess(
          req,
          res,
          "Data added successfully",
          StatusCode.OK,
          data
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
    }

  } catch (error) {

  }

}

export const getSingleOrder = async (req, res) => {
  try {
    console.log("rrrrr");
    const { company_code, order_id } = req.query; 
    const { error, value } = getSingleOrderSchema.validate(req.query);

    if (error) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, error);
    } else {
      const data = await getSingleOrderService(company_code, order_id); 
      if (data && data.success) {  
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
          "Unable to retrieve data", // Update the failure message
          StatusCode.NOT_FOUND,
          null
        );
      }
    }
  } catch (error) {
    console.error("Error in getSingleOrder:", error);
    responseError(res, error, StatusCode.INTERNAL_SERVER_ERROR); // Handle internal server errors
  }
}


export const deleteOrder = async (req, res) => {
  try {
    const order_id = req.query.order_id;
    const { error, value } = getSingleOrderSchema.validate(req.query);
    if (error) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, error);
    } else {
      const updatedItem = await deleteOrderService(order_id);
      if (updatedItem) {
        responseSuccess(
          req,
          res,
          "Data  deleted successfully",
          StatusCode.OK,
          updatedItem
        );
      } else {
        responseFailure(
          req,
          res,
          "Unable to delete data",
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
