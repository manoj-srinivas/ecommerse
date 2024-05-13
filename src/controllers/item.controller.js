import { StatusCode } from "../helpers/constants.js";
import {
  responseError,
  responseFailure,
  responseSuccess,
} from "../helpers/response.js";
import {
  getItems,
  getItem as getItemService,
  addItemService,
  editItemService,
  deleteItemService,
  getAllCategories,
  getAllSubCategories,
  getAllItemTypes,
  getAllUOMs,
  getAllBrands,
  getall_cat_subcat
} from "../services/item.service.js";
import {
  getItemSchema,
  getItemsSchema,
  deleteItemSchema,
  addItemSchema,
  cat_subcat_schema
} from "../../validations.js";

export const getItemList = async (req, res) => {
  try {
    const { error, value } = getItemsSchema.validate(req.query);
    if (error) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, error);
    } else {
      const data = await getItems(req.query);
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

export const getItem = async (req, res) => {
  try {
    const { error, value } = getItemSchema.validate(req.query);
    if (error) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, error);
    } else {
      const data = await getItemService(req.query);
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

export const addItem = async (req, res) => {
  try {
    const { error, value } = addItemSchema.validate(req.body);
    if (error) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, error);
    } else {
      const data = await addItemService(req.body);
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

export const editItem = async (req, res) => {
  try {
    const itemId = req.query.itemId;
    const newData = req.body;
    const { error, value } = addItemSchema.validate(req.body);
    if (error) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, error);
    } else {
      const updatedItem = await editItemService(itemId, newData);
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
    }
  } catch (error) {
    console.log(error);
    responseError(res, error, StatusCode.NOT_FOUND);
  }
};

export const deleteItem = async (req, res) => {
  try {
    const itemId = req.query.itemId;
    const status = req.body;
    const { error, value } = deleteItemSchema.validate(req.body);
    if (error) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, error);
    } else {
      const updatedItem = await deleteItemService(itemId, status);
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
    }
  } catch (error) {
    console.log(error);
    responseError(res, error, StatusCode.NOT_FOUND);
  }
};

export const getCategories = async (req, res) => {
  try {
    const company_code = req.query.company_code;
    const { error, value } = deleteItemSchema.validate(req.body);
    if (false) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, error);
    } else {
      const categories = await getAllCategories(company_code);
      if (categories) {
        responseSuccess(
          req,
          res,
          "Categories retrived successfully",
          StatusCode.OK,
          categories
        );
      } else {
        responseFailure(
          req,
          res,
          "Unable to get data",
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

export const getSubCategories = async (req, res) => {
  try {
    const { company_code, category_code } = req.query;
    const { error, value } = deleteItemSchema.validate(req.body);
    if (false) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, error);
    } else {
      const categories = await getAllSubCategories(company_code, category_code);
      if (categories) {
        responseSuccess(
          req,
          res,
          "Sub-Categories retrived successfully",
          StatusCode.OK,
          categories
        );
      } else {
        responseFailure(
          req,
          res,
          "Unable to get data",
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

export const getItemTypes = async (req, res) => {
  try {
    const { company_code } = req.query;
    const { error, value } = deleteItemSchema.validate(req.body);
    if (false) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, error);
    } else {
      const itemTypes = await getAllItemTypes(company_code);
      if (itemTypes) {
        responseSuccess(
          req,
          res,
          "Item-Types retrived successfully",
          StatusCode.OK,
          itemTypes
        );
      } else {
        responseFailure(
          req,
          res,
          "Unable to get data",
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

export const getUOMs = async (req, res) => {
  try {
    const { status } = req.query;
    const { error, value } = deleteItemSchema.validate(req.body);
    if (false) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, error);
    } else {
      const uoms = await getAllUOMs(status);
      if (uoms) {
        responseSuccess(
          req,
          res,
          "Item-Types retrived successfully",
          StatusCode.OK,
          uoms
        );
      } else {
        responseFailure(
          req,
          res,
          "Unable to get data",
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

export const getBrands = async (req, res) => {
  try {
    const { company_code } = req.query;
    const { error, value } = deleteItemSchema.validate(req.body);
    if (false) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, error);
    } else {
      const brands = await getAllBrands(company_code);
      if (brands) {
        responseSuccess(
          req,
          res,
          "Item-Types retrived successfully",
          StatusCode.OK,
          brands
        );
      } else {
        responseFailure(
          req,
          res,
          "Unable to get data",
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

export const get_cat_subcat = async (req, res) => {
  try {
    const { error, value } = cat_subcat_schema.validate(req.query);
    if (error) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, error);
    } else {
      const data = await getall_cat_subcat(req.query);
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