import purchaseOrdersModel from "../models/purchaseOrders.model.js";
import supplierModel from "../models/suppliers.model.js"

export const createNewPurchaseOrder = async (
  company_code,
  supplier_code,
  company_name,
  email,
  phone_number,
  street_1,
  street_2,
  gst_no,
  items
) => {

  const purchaseOrders = await purchaseOrdersModel.find({
    company_code:company_code
  })

  var supplierDetails = await supplierModel.aggregate([
    {
      $match: {
        company_code: company_code,
        status: "ACTIVE",
        supplier_code: supplier_code,
      },
    },
    {
      $project: {
        _id: 0,
        supplier_code: 1,
        first_name: 1,
        last_name: 1,
        email: 1,
        phone_number: 1,
        country_code: 1,
        company_code: 1,
        street_1: 1,
        street_2: 1,
        city: 1,
        state: 1,
        zip_code: 1,
        company_name: 1,
        gst_no: 1,
      },
    },
  ]);

  const pad = "0000"
  const str = "" + purchaseOrders.length+1||0
  const num = pad.substring(0, pad.length - str.length) + str

  if(!supplierDetails[0]){
    const suppliers = await supplierModel.find({
      company_code:company_code
    })

    const pad = "0000"
    const str = "" + suppliers.length+1||0
    const num = pad.substring(0, pad.length - str.length) + str
    
    supplier_code = "SUP"+"BA"+num
    const supplier = new supplierModel(company_code,company_name,supplier_code,email,phone_number,street_1,street_2,gst_no)
    supplierDetails.add(await supplier.save())
  }


  supplierDetails[0].po_number = "PO"+yyyymmdd()+ "BA" + num
  supplierDetails[0].po_date = new Date().toISOString()
  supplierDetails[0].items = items
  supplierDetails[0].status = "Submitted"

  const purchaseOrderModel = new purchaseOrdersModel(supplierDetails[0])
  const purchaseOrder = await purchaseOrderModel.save() 

  return purchaseOrder
};

function yyyymmdd() {
  var x = new Date();
  var y = x.getFullYear().toString();
  var m = (x.getMonth() + 1).toString();
  var d = x.getDate().toString();
  (d.length == 1) && (d = '0' + d);
  (m.length == 1) && (m = '0' + m);
  var yyyymmdd = y + m + d;
  return yyyymmdd;
}
