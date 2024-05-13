

import suppliersModel from "../models/suppliers.model.js"

export const createSuppliers = async (body, Supplierdata) => {
  try {
    const existingSupplier = await suppliersModel.find({
      email: body.email
    });
    console.log(existingSupplier, "existingSupplierexistingSupplier");
    const isActive = existingSupplier.some(supplier => supplier.status === "ACTIVE");

    if (isActive) {
      return {
        status_code: 400,
        message: "Supplier already exists",
      };
    }

    const latestSupplier = await suppliersModel.findOne(
      {},
      {},
      { sort: { createdAt: -1 } }
    );
    let newSupplierCode = 1;

    if (latestSupplier && latestSupplier.supplier_code) {
      newSupplierCode = parseInt(latestSupplier.supplier_code.substr(6)) + 1;
    }

    const SupplierCode = "SUP" + "BA" + newSupplierCode.toString().padStart(4, "0");

    console.log(SupplierCode, "SupplierCode");

    const newSupplierData = {
      ...Supplierdata,
      supplier_code: SupplierCode,
      status: "ACTIVE"
    };

    const newSupplier = new suppliersModel(newSupplierData);
    const savedSupplier = await newSupplier.save();
    return savedSupplier;
  } catch (error) {
    console.log(error);
    throw {
      status_code: 500,
      message: "Some error occurred while saving the data",
      error: error
    };
  }
}


export const getAllSuppliers = async (company_code) => {
  try {
    const suppliers = await suppliersModel.find({ company_code: company_code });
    return suppliers;
  } catch (error) {
    throw error;
  }
};

export const editSuppliersService = async (email, newData) => {
  console.log(email, "emailemailemail");
  try {
    const result = await suppliersModel.updateOne(
      { email: email },
      { $set: newData }
    );

    if (result.nModified === 0) {
      return {
        success: false,
        message: "Email not found",
        data: null,
      };
    }

    return {
      success: true,
      message: "Data edited successfully",
      data: result,
    };
  } catch (error) {
    throw error;
  }
};


export const deleteSuppliersService = async (email, status) => {
  try {
    const updateResult = await suppliersModel.updateOne(
      { email: email },
      { $set: { status: "INACTIVE" } }
    );
    return {
      success: true,
      message: "Data delete successfully",
      data: updateResult,
    };
  } catch (error) {
    throw error;
  }
};