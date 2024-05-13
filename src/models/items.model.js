import mongoose from "mongoose";
import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;

const itemSchema = mongoose.Schema(
  {
    item_code: {
      type: String,
      required: true,
    },
    company_code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    UOM: {
      type: String,
      required: true,
    },
    item_type_code: {
      type: String,
      required: true,
    },
    category_code: {
      // type: ObjectId,
      type: String,
      required: true,
    },
    sub_category_code: {
      // type: ObjectId,
      type: String,
      required: true,
    },
    brand_code: {
      type: String,
      required: true,
    },
    purchase_price: {
      type: Number,
      required: true,
    },
    selling_price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    primary_image: {
      type: String,
      required: false,
    },
    images: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["ACTIVE", "IN-ACTIVE"],
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    size: String,
    color: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("items", itemSchema, "items");
