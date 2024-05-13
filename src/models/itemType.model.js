import mongoose from "mongoose";

const itemType = mongoose.Schema(
  {
    company_code: {
      type: String,
    },
    item_type_name: {
      type: String,
    },
    item_type_code: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("item_types", itemType, "item_types");
