import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    // user_code: {
    //   type: String,
    //   required: true,
    // },
    image: String,
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
      required: true,
    },
    phone_number: String,
    country_code: String,
    role: String,
    last_login_timestamp: { type: Date, default: Date.now },
    last_password_change_timestamp: { type: Date, default: Date.now },
    invalid_attempts: Number,
    is_locked: Boolean,
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
    },
    company_code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Users", userSchema);
