import mongoose from "mongoose";
import mongodb from "mongodb";

const stockSchema = mongoose.Schema(
  {
    company_code: {
      type: String,
      required: true,
    },
    store_code: {
      type: String,
      required: true,
    },
    item_code: {
      type: String,
      required: true,
    },
    item_name: {
      type: String,
      required: true,
    },
    UOM: {
      type: String,
      required: true,
      enum: ["PCK", "PC", "KG"],
    },
    rack_code: {
      type: String,
      required: true,
    },
    slot_code: {
      type: String,
      required: true,
    },
    proc_price: {
      type: Number,
    },
    mrp: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    reorder_level: {
      type: Number,
      required: true,
    },
    grn_quantity: {
      type: Number,
      required: true,
    },
    sale_quantity: {
      type: Number,
      required: true,
    },
    damage_quantity: {
      type: Number,
      required: true,
    },
    blocked_quantity: {
      type: Number,
      required: true,
    },
    grn_return_quantity: {
      type: Number,
      required: true,
    },
    sale_return_quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("item_stocks", stockSchema, "item_stocks");
