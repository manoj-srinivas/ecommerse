import express from "express";
import {
  addToCart,
  emptyCart,
  getCartItems,
} from "../controllers/cart.controller.js";

const routes = express.Router();
routes.put("/add", addToCart);
routes.get("/items", getCartItems);
routes.put("/emptyCart", emptyCart);

export default routes;
