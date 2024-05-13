import { StatusCode } from "./constants.js";
import { responseError } from "./response.js";

const tryCatchWrapper = controller => async (req, res, next) => {
  console.log("Try catch block")
  try {
    await controller(req, res);
  } catch (error) {
    console.log(error);
    responseError(res, error, StatusCode.NOT_FOUND);
    return next(error);
  }
};

export default tryCatchWrapper
