import {
  calculateDiscount,
  calculateTax,
  getDateCode,
} from "../helpers/common.js";
import customersModel from "../models/customers.model.js";
import ordersModel from "../models/orders.model.js";
import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;

export const creatOrderService = async (req) => {
  const { customer_code, company_code, address_code } = req.body;
  const pin = 56;
  const orderId = "EC" + getDateCode(new Date()) + pin;

  const customerDetails = await customersModel.aggregate([
    {
      $match: {
        company_code: company_code,
        _id: new ObjectId(customer_code),
      },
    },
    {
      $lookup: {
        from: "carts",
        localField: "_id",
        foreignField: "customer_code",
        as: "cart_items",
      },
    },
    {
      $addFields: {
        customer_address: {
          $slice: [
            {
              $filter: {
                input: "$address",
                as: "location",
                cond: {
                  $eq: ["$$location._id", new ObjectId(address_code)],
                },
              },
            },
            1,
          ],
        },
        items: {
          $first: "$cart_items.items",
        },
      },
    },
    {
      $project: {
        customer_code: "$_id",
        customer_name: {
          $concat: ["$first_name", " ", "$last_name"],
        },
        customer_phone_no: "$phone_number",
        customer_email: "$email",
        customer_address: {
          $first: "$customer_address",
        },
        sales_person_code: "65b131eb2b007a70aa487640",
        sales_person_name: "John Doe",
        amount: {
          $sum: "$items.price",
        },
        items: "$items",
      },
    },
  ]);

  if (customerDetails[0]) {
    const discount = 10;
    const gross_amount = calculateDiscount(discount, customerDetails[0].amount);
    const tax_amount = calculateTax(gross_amount);
    const net_amount = gross_amount + tax_amount;

    const order = new ordersModel({
      ...customerDetails[0],
      order_id: orderId,
      order_status: "Awaiting Fulfillment",
      sale_date: new Date().toISOString(),
      discount,
      gross_amount,
      tax_amount,
      net_amount,
      payment_mode: "UPI",
      payment_details: {
        transaction_id: "563898gdhbbdewdhdscsdg",
        date: new Date().toISOString(),
      },
    });

    console.log("Order ===== ", order);

    return await order.save();
  } else {
    return null;
  }
};

export const getOrderService = async (req) => {
  try {
    const data = await ordersModel.find({})
    return {
      success: true,
      message: "Data updated successfully",
      data: data,
    };
  } catch (error) {
    throw error;
  }
}
export const getSingleOrderService = async (company_code, order_id) => {
  try {
    console.log("company_code:", company_code);
    console.log("order_id:", order_id);
    const data = await ordersModel.find({ order_id: order_id });

    console.log("data:", data);
    if (data) {
      return {
        success: true,
        message: "Data retrieved successfully",
        data: data,
      };
    } else {
      return {
        success: false,
        message: "No data found for the specified order ID",
        data: null,
      };
    }
  } catch (error) {
    console.error("Error in getSingleOrderService:", error);
    throw error;
  }
}

export const deleteOrderService = async (order_id) => {
  try {
    console.log("order_id", order_id);
    const updateResult = await ordersModel.updateOne(
      { order_id: order_id },
      { $set: { status: "INACTIVE" } }
    );

    console.log("updateResult:", updateResult);

    if (updateResult.modifiedCount === 1) {
      return {
        success: true,
        message: "Order status updated to INACTIVE",
        data: updateResult,
      };
    } else {
      return {
        success: false,
        message: "No order found with the specified ID",
        data: null,
      };
    }
  } catch (error) {
    console.error("Error in deleteOrderService:", error);
    throw error;
  }
};
