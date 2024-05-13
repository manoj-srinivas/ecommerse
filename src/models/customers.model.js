import mongoose from "mongoose";

const customerSchema = mongoose.Schema(
  {
    customer_code: {
      type: String,
      required: true,
    },
    image: String,
    password: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone_number: {
      type: Number,
      required: true,
    },
    country_code: {
      type: String,
      required: true,
    },
    last_login_timestamp: { type: Date, default: Date.now },
    last_password_change_timestamp: { type: Date, default: Date.now },
    invalid_attempts: Number,
    is_locked: Boolean,
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
    },
    address: [
      {
        street_1: String,
        street_2: String,
        city: String,
        state: String,
        zip_code: Number,
        phone_number: Number,
        type: {
          type: String,
          enum: ["home", "office"],
        },
        is_default_address: Boolean,
      },
    ],
    payment: [
      {
        card_type: {
          type: String,
          enum: ["credit", "debit"],
        },
        card_holder_name: String,
        card_number: Number,
        cvv: Number,
        exp_year: Number,
        exp_month: Number,
      },
    ],
    company_code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("customers", customerSchema);
