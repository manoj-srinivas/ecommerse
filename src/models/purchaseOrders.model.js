import mongoose from "mongoose";

const purchaseOrdersSchema = mongoose.Schema(
  {
    supplier_code: {
      type: "String",
      required: true,
    },
    first_name: {
      type: "String",
      required: true,
    },
    last_name: {
      type: "String",
      required: true,
    },
    email: {
      type: "String",
      required: false,
    },
    phone_number: {
      type: "Number",
      required: true,
    },
    country_code: {
      type: "Date",
      required: true,
    },
    company_code: {
      type: "String",
      required: true,
    },
    street_1: {
      type: "String",
      required: true,
    },
    street_2: {
      type: "String",
      required: true,
    },
    city: {
      type: "String",
      required: true,
    },
    state: {
      type: "String",
      required: true,
    },
    zip_code: {
      type: "Number",
      required: true,
    },
    status: {
      type: "String",
      required: true,
      enum: [
        "Draft",
        "Submitted",
        "Approved",
        "Rejected",
        "Partially Fulfilled",
        "Fulfilled",
        "Closed",
      ],
    },
    company_name: {
      type: "String",
      required: true,
    },
    gst_no: {
      type: "String",
      required: true,
    },
    po_number: {
      type: String,
      required: true,
    },
    po_date: {
      type: Date,
      required: true,
    },
    items: [
      {
        item_code: {
          type: "String",
          required: true,
        },
        item_name: {
          type: "String",
          required: true,
        },
        UOM: {
          type: "String",
          required: true,
        },
        price: {
          type: "Number",
          required: true,
        },
        po_quantity: {
          type: "Number",
          required: true,
        },
        grn_quantity: {
          type: "Number",
          required: false,
        },
        gross_amount: {
          type: "Number",
          required: false,
        },
        discount: {
          type: "Number",
          required: false,
        },
        tax_amount: {
          type: "Number",
          required: false,
        },
        net_amount: {
          type: "Number",
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "purchase_orders",
  purchaseOrdersSchema,
  "purchase_orders"
);
