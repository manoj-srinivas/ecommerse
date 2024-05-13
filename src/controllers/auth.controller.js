import { StatusCode } from "../helpers/constants.js";
import {
  responseError,
  responseFailure,
  responseSuccess,
} from "../helpers/response.js";
import {
  customerSignIn as customerSignInService,
  customerSignUp as customerSignUpService,
  signUp as signUpService,
  signIn as signInService,
} from "../services/auth.service.js";
import {
  customerSigninSchema,
  customerSignupSchema,
  userSigninSchema,
  userSignupSchema,
} from "../../validations.js";

export const signIn = async (req, res) => {
  console.log("signIn");
  try {
    const { error, value } = userSigninSchema.validate(req.query);
    if (error) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, null);
    } else {
      const { email, password, company_code } = req.query;
      const data = await signInService(email, password, company_code);
      if (data) {
        responseSuccess(
          req,
          res,
          "Data Retrieved successfully",
          StatusCode.OK,
          data
        );
      } else {
        responseFailure(
          req,
          res,
          "Failed to retrieve data",
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

export const signUp = async (req, res) => {
  try {
    console.log(req.body);
    const { error, value } = userSignupSchema.validate(req.body);
    if (error) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, null);
    } else {
      const { user_name, email, password, company_code } = req.body;
      const data = await signUpService(
        user_name,
        email,
        password,
        company_code
      );
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
          "User Already exists",
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

export const customerSignIn = async (req, res) => {
  try {
    const { error, value } = customerSigninSchema.validate(req.query);
    if (error) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, null);
    } else {
      const data = await customerSignInService(req.query);
      if (data) {
        responseSuccess(
          req,
          res,
          "Data Retrieved successfully",
          StatusCode.OK,
          data
        );
      } else {
        responseFailure(
          req,
          res,
          "Failed to retrieve data",
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

export const customerSignUp = async (req, res) => {
  try {
    const { error, value } = customerSignupSchema.validate(req.body);
    if (error) {
      responseFailure(req, res, "Bad request", StatusCode.BAD_REQUEST, error);
    } else {
      const data = await customerSignUpService(req.body);
      if (data) {
        responseSuccess(
          req,
          res,
          "Data Retrieved successfully",
          StatusCode.OK,
          data
        );
      } else {
        responseFailure(
          req,
          res,
          "Failed to retrieve data",
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
