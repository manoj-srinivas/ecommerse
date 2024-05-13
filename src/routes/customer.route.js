import express from "express";
import {
  addAddress,
  addPayment,
  updateAddress,
  updateCustomer,
  updatePassword,
  updatePayment,
} from "../controllers/customer.controller.js";

const routes = express.Router();

routes.put("/address/:company_code/:customer_code", addAddress);
routes.put(
  "/address/:company_code/:customer_code/:address_code",
  updateAddress
);

//need to add validations of existing bank details in update
routes.put("/payment/:company_code/:customer_code", addPayment);
routes.put(
  "/payment/:company_code/:customer_code/:payment_code",
  updatePayment
);

routes.put("/:company_code/:customer_code", updateCustomer);
routes.put("/password/:company_code/:customer_code", updatePassword);

export default routes;
