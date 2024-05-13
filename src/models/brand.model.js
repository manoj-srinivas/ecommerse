import mongoose from "mongoose";

const brand = mongoose.Schema(
  {
    company_code: {
      type: "String",
    },
    brand_code: {
      type: "String",
    },
    brand_name: {
      type: "String",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("brands", brand, "brands");
