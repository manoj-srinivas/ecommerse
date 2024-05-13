import cartModel from "../models/cart.model.js";
import mongodb from "mongodb";
import itemsModel from "../models/items.model.js";
import { calculateDiscount, calculateTax } from "../helpers/common.js";

export const addToCartService = async (req) => {
  const { customer_code, item_code, quantity, company_code } = req.body;
  let cart = await cartModel.findOne({
    customer_code: customer_code,
    company_code,
  });
  let itemDetails = await itemsModel.aggregate([
    {
      $match: {
        item_code: item_code,
        company_code: company_code,
      },
    },
    {
      $lookup: {
        from: "item_stocks",
        localField: "_id",
        foreignField: "item_code",
        as: "price",
      },
    },
    {
      $lookup: {
        from: "brands",
        localField: "brand_id",
        foreignField: "_id",
        as: "brand_details",
      },
    },
    {
      $project: {
        _id: 0,
        item_code: "$item_code",
        item_name: "$name",
        UOM: 1,
        primary_image: 1,
        brand_name: { $first: "$brand_details.brand_name" },
        price: {
          $first: "$price.mrp",
        },
      },
    },
  ]);

  const discount = 10;
  const gross_amount = calculateDiscount(
    discount,
    itemDetails[0].price * quantity
  );
  const tax_amount = calculateTax(gross_amount);
  const net_amount = gross_amount + tax_amount;

  //If cart exists
  if (cart) {
    //Check if index exists
    const indexFound = cart.items.findIndex(
      (item) => item.item_code == item_code
    );

    //remove the item if the item quantity is zero
    if (indexFound !== -1 && quantity <= 0) {
      cart.items.splice(indexFound, 1);
    }
    //Increase the quantity if item already exists
    else if (indexFound !== -1) {
      const updatedQuantity = cart.items[indexFound].quantity + quantity;
      const gross_amount = calculateDiscount(
        discount,
        itemDetails[0].price * updatedQuantity
      );
      const tax_amount = calculateTax(gross_amount);
      const net_amount = gross_amount + tax_amount;
      cart.items[indexFound].quantity = updatedQuantity;
      cart.items[indexFound].amount = itemDetails[0].price * updatedQuantity;
      cart.items[indexFound].discount = discount;
      cart.items[indexFound].gross_amount = gross_amount;
      cart.items[indexFound].tax_amount = tax_amount;
      cart.items[indexFound].net_amount = net_amount;
    }
    //Add to items if the quantity is greater than zero
    else if (quantity > 0) {
      cart.items.push({
        item_code: itemDetails[0].item_code,
        item_name: itemDetails[0].item_name,
        UOM: itemDetails[0].UOM,
        primary_image: itemDetails[0].primary_image,
        price: itemDetails[0].price,
        quantity: quantity,
        brand_name: itemDetails[0].brand_name,
        item_added_datetime: new Date().toISOString(),
        amount: itemDetails[0].price * quantity,
        discount: discount,
        gross_amount: gross_amount,
        tax_amount: tax_amount,
        net_amount: net_amount,
      });
    } else {
      return null;
    }

    console.log("Data ==== ", cart);

    let data = await cart.save();
    return data;
  } else {
    const cart = new cartModel({
      customer_code,
      company_code,
      items: [
        {
          item_code: itemDetails[0].item_code,
          item_name: itemDetails[0].item_name,
          UOM: itemDetails[0].UOM,
          primary_image: itemDetails[0].primary_image,
          price: itemDetails[0].price,
          quantity: quantity,
          brand_name: itemDetails[0].brand_name,
          item_added_datetime: new Date().toISOString(),
          amount: itemDetails[0].price * quantity,
          discount,
          gross_amount,
          tax_amount,
          net_amount,
        },
      ],
    });

    const insertedCartData = await cart.save();
    return insertedCartData;
  }
};

export const getCartItemsService = async (req) => {
  const { customer_code, company_code } = req.query;
  const cartDetails = await cartModel.findOne(
    { customer_code: customer_code, company_code },
    { items: 1, _id: 0 }
  );
  return cartDetails.items;
};

export const emptyCartService = async (req) => {
  const { customer_code, company_code } = req.query;
  const cartDetails = await cartModel.findOne({
    customer_code: customer_code,
    company_code,
  });
  cartDetails.items = [];
  return await cartDetails.save();
};
