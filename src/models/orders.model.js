import mongoose from "mongoose";
import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;

const ordersSchema = mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
    },
    order_status: {
      type: String,
      required: true,
      enum: [
        "Pending",
        "Awaiting Payment",
        "Awaiting Fulfillment",
        "Awaiting Shipment",
        "Awaiting Pickup",
        "Partially Shipped",
        "Completed",
        "Shipped",
        "Cancelled",
        "Declined",
        "Refunded",
        "Disputed",
        "Manual Verification Required",
        "Partially Refunded",
      ],
    },
    sale_date: {
      type: Date,
      required: true,
    },
    customer_code: {
      type: String,
      required: true,
    },
    customer_name: {
      type: String,
      required: true,
    },
    customer_phone_no: {
      type: Number,
      required: true,
    },
    customer_email: {
      type: String,
      required: true,
    },
    customer_address: {
      street_1: {
        type: String,
        required: true,
      },
      street_2: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zip_code: {
        type: Number,
        required: true,
      },
      phone_number: {
        type: Number,
        required: true,
      },
      type: {
        type: String,
        enum: ["home", "office"],
      },
      customer_code: {
        type: String,
        required: true,
      },
    },
    sales_person_code: {
      type: String,
      required: true,
    },
    sales_person_name: {
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
    //define all the enums
    payment_mode: {
      type: String,
      required: true,
    },
    payment_details: {
      transaction_id: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
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
        gross_amount: {
          type: Number,
          required: true,
        },
        discount: {
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
        status:{
          type: String,
          enum: ["ACTIVE", "INACTIVE"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("orders", ordersSchema);
