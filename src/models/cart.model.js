import mongoose from "mongoose";

const cartModel = mongoose.Schema({
  customer_code: {
    type: String,
    required: true,
  },
  company_code: {
    type: String,
    Request: true,
  },
  items: [
    {
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
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      primary_image: {
        type: String,
        required: true,
      },
      brand_name: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
        required: true,
      },
      gross_amount: {
        type: Number,
        required: true,
      },
      tax_amount: {
        type: Number,
        required: true,
      },
      net_amount: {
        type: Number,
        required: true,
      },
      item_added_datetime: {
        type: Date,
        required: true,
      },
    },
    {
      timestamps: true,
    },
  ],
});

export default mongoose.model("carts", cartModel);
