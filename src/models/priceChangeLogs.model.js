import mongoose from "mongoose";
import mongodb from "mongodb";
import { required } from "joi";

const ObjectId = mongodb.ObjectId;

const priceChangeLogs = mongoose.Schema({
  // company_code:{
  //     type: ObjectId,
  //     required: true,
  // },
  // price_request_date:{
  //     type: Date, default: Date.now,
  // },
  // price_approved_date:{
  //     type: Date, default: Date.now
  // },
  // item_code:{
  //     type: String,
  //     required:true
  // },
  // item_name:{
  //     type:
  //     required
  // },
  // UOM:{
  // }
  // current_price
  // requested_price
  // approved_price
  // approved_by
  // approved_datetime
  // effective_from
});
