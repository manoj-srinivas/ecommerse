import mongoose from "mongoose";

const subCategorySchema = mongoose.Schema(
  {
    sub_category_name: {
      type: String,
      required: true,
    },
    category_code: {
      type: String,
      required: true,
    },
    sub_category_code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "sub_categories",
  subCategorySchema,
  "sub_categories"
);
