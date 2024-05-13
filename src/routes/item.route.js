import express from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import {
  getItem,
  getItemList,
  addItem,
  editItem,
  deleteItem,
  getCategories,
  getSubCategories,
  getItemTypes,
  getUOMs,
  getBrands,
  get_cat_subcat
} from "../controllers/item.controller.js";

const routes = express.Router();

routes.get("/items", getItemList);
routes.get("/item", getItem);
routes.post("/addItem", addItem);
routes.put("/editItem", editItem);
routes.put("/deleteItem", deleteItem);
routes.get("/categories", getCategories);
routes.get("/subCategories", getSubCategories);
routes.get("/itemTypes", getItemTypes);
routes.get("/uoms", getUOMs);
routes.get("/brands", getBrands);
routes.get("/cat_subcat", get_cat_subcat);

export default routes;
