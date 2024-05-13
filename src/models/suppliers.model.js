import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    password: {
      type: String,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone_number: {
      type: Number,
    },
    country_code: {
      type: String,
    },
    company_code: {
      type: String,
    },
    street_1: {
      type: String,
    },
    street_2: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip_code: {
      type: String,
    },
    supplier_code :{
      type: String,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
    },
    company_name: {
      type: String,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    gst_no: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Suppliers", supplierSchema,"Suppliers");

