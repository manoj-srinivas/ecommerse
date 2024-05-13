import { StatusCode } from "../helpers/constants.js";
import {
  responseError,
  responseFailure,
  responseSuccess,
} from "../helpers/response.js";
import {
  addToCartService,
  emptyCartService,
  getCartItemsService,
} from "../services/cart.service.js";
import {
  addToCartSchema,
  getCartItemsSchema,
  getItemSchema,
} from "../../validations.js";

export const addToCart = async (req, res) => {
  try {
    const { error, value } = addToCartSchema.validate(req.body);
    if (error) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, error);
    } else {
      const data = await addToCartService(req);
      if (data) {
        responseSuccess(
          req,
          res,
          "Data Added successfully",
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

export const getCartItems = async (req, res) => {
  try {
    const { error, value } = getCartItemsSchema.validate(req.query);
    if (error) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, error);
    } else {
      const data = await getCartItemsService(req);
      if (data) {
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
    responseError(res, error, StatusCode.NOT_FOUND);
  }
};

export const emptyCart = async (req, res) => {
  try {
    const { error, value } = getCartItemsSchema.validate(req.query);
    if (error) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, error);
    } else {
      const data = await emptyCartService(req);
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
