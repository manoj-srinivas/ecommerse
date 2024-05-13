import { StatusCode } from "../helpers/constants.js";
import { responseSuccess } from "../helpers/response.js";
import { createNewPurchaseOrder } from "../services/puchaseOrder.service.js";

export const createPO = async (req, res) => {
  const { company_code, supplier_code } = req.query;
  const items = req.body;
  const data = await createNewPurchaseOrder(company_code, supplier_code, items);
  responseSuccess(req, res, "PO created successfully", StatusCode.OK, data);
};
