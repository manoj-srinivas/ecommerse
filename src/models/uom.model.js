import mongoose from "mongoose";

const uom = mongoose.Schema(
  {
    uom_code: {
      type: "String",
    },
    uom_name: {
      type: "String",
    },
    status: {
      type: "String",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("uoms", uom, "uoms");
