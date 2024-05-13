import express from "express";
import { createOrder, getOrder ,deleteOrder,getSingleOrder} from "../controllers/order.controller.js";

const routes = express.Router();

routes.post("/", createOrder);
routes.get("/getOrder", getOrder)
routes.get("/getSingleOrder", getSingleOrder)
routes.put("/deleteOrder", deleteOrder)





export default routes;
