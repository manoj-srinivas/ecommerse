import express from "express";
import { createPO } from "../controllers/purchaseOrder.controller.js";
import tryCatchWrapper from "../helpers/tryCatchWrapper.js";

const routes = express.Router();
 
routes.post("/", tryCatchWrapper(createPO));

export default routes;
