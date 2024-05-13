import express from "express";
// import {
 
import {addSuppliers,getSuppliers,editSuppliers,deleteSuppliers} from '../controllers/suppliers.controller.js';
 
const routes = express.Router();

routes.post("/addSuppliers", addSuppliers);
routes.get("/getSuppliers", getSuppliers);
routes.put("/editSuppliers",editSuppliers)
routes.put("/deleteSuppliers",deleteSuppliers)




export default routes;
