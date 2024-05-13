import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    company_code: {
      type: String,
      required: true,
    },
    category_name: {
      type: String,
      required: true,
    },
    category_code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("categories", categorySchema, "categories");
