import itemsModel from "../models/items.model.js";
import categoryModel from "../models/categories.model.js";
import subCategoryModel from "../models/subCategories.model.js";
import subCategoriesModel from "../models/subCategories.model.js";
import itemTypeModel from "../models/itemType.model.js";
import uomModel from "../models/uom.model.js";
import brandModel from "../models/brand.model.js";

export const getItems = async (query) => {
  var {
    company_code,
    page,
    pageSize,
    category_code,
    item_price_gt,
    item_price_lt,
    item_rating,
    search_key,
    sort_by,
  } = query;
  page = parseInt(page, 10) || 1;
  pageSize = parseInt(pageSize, 10) || 10;
  const filter = {};

  if (category_code && category_code != "All") {
    filter.category_code = { $in: [category_code] };
  }
  if (item_price_gt && item_price_lt) {
    filter.$and = [
      { item_price: { $gt: Number(item_price_gt) } },
      { item_price: { $lt: Number(item_price_lt) } },
    ];
  }
  if (item_rating) {
    filter.item_rating = { $gte: Number(item_rating) };
  }
  if (search_key) {
    filter.name = { $regex: search_key, $options: "i" };
  }

  var sort = {
    item_price: -1,
  };

  switch (sort_by) {
    case "price_high":
      sort = { item_price: -1 };
      break;
    case "price_low":
      sort = { item_price: 1 };
      break;
  }

  console.log(filter);

  return await itemsModel.aggregate([
    {
      $match: {
        company_code: company_code,
        status: "ACTIVE",
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category_code",
        foreignField: "category_code",
        as: "categories_details",
      },
    },
    {
      $lookup: {
        from: "item_types",
        localField: "item_type_code",
        foreignField: "item_type_code",
        as: "item_type_details",
      },
    },
    {
      $project: {
        _id: 0,
        item_code: "$item_code",
        item_name: "$name",
        item_image: "$primary_image",
        item_category: {
          $first: "$categories_details.category_name",
        },
        item_type: {
          $first: "$item_type_details.item_type_name",
        },
        status: "$status",
        selling_price: 1,
        inventory_quantity: "0",
      },
    },
  ]);
};

export const getItem = async ({ company_code, item_code }) => {
  const data = await itemsModel.aggregate([
    {
      $match: {
        company_code: company_code,
        item_code: item_code,
      },
    },
    {
      $lookup: {
        from: "brands",
        localField: "brand_code",
        foreignField: "brand_code",
        as: "brand",
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category_code",
        foreignField: "category_code",
        as: "category",
      },
    },
    {
      $lookup: {
        from: "ratings_reviews",
        localField: "item_code",
        foreignField: "item_code",
        as: "ratings_reviews",
      },
    },
    {
      $lookup: {
        from: "item_stocks",
        localField: "item_code",
        foreignField: "item_code",
        as: "price",
      },
    },
    {
      $project: {
        _id: 0,
        item_code: "$item_code",
        item_name: "$name",
        item_description: "$description",
        item_uom: "$UOM",
        item_image: "$primary_image",
        item_brand: {
          $first: "$brand",
        },
        item_category: {
          $first: "$category",
        },
        item_price: {
          $first: "$price.mrp",
        },
        item_rating: {
          $first: "$ratings_reviews.ratings",
        },
      },
    },
  ]);

  return data ? data[0] : {};
};

export const addItemService = async (itemData) => {
  try {
    const latestItem = await itemsModel.findOne(
      {},
      {},
      { sort: { createdAt: -1 } }
    );
    console.log("Latest item ====== ", latestItem);
    let newItemCodeNumber = parseInt(latestItem.item_code.substr(4)) + 1;
    const newItemCode = "ITEM" + newItemCodeNumber.toString().padStart(3, "0");
    itemData.item_code = newItemCode;
    itemData.status = "ACTIVE";
    const newItem = new itemsModel(itemData);
    const savedItem = await newItem.save();
    return savedItem;
  } catch (error) {
    throw error;
  }
};

export const editItemService = async (itemId, newData) => {
  try {
    const updateResult = await itemsModel.updateOne(
      { item_code: itemId },
      { $set: newData }
    );
    return {
      success: true,
      message: "Data updated successfully",
      data: updateResult,
    };
  } catch (error) {
    throw error;
  }
};

export const deleteItemService = async (itemId, status) => {
  try {
    const updateResult = await itemsModel.updateOne(
      { item_code: itemId },
      { $set: { status: "INACTIVE" } }
    );
    return {
      success: true,
      message: "Data updated successfully",
      data: updateResult,
    };
  } catch (error) {
    throw error;
  }
};

export const getAllCategories = async (company_code) => {
  const categories = await categoryModel.find({
    company_code,
  });

  return categories;
};

export const getAllSubCategories = async (company_code, category_code) => {
  const filter = {
    company_code,
  };

  if (category_code) {
    filter.category_code = category_code;
  }

  console.log(filter);

  const subCategories = await subCategoriesModel.find(filter);

  return subCategories;
};

export const getAllItemTypes = async (company_code) => {
  const itemTypes = await itemTypeModel.find({
    company_code,
  });

  return itemTypes;
};

export const getAllUOMs = async (status) => {
  const uoms = await uomModel.find({
    status,
  });

  return uoms;
};

export const getAllBrands = async (company_code) => {
  const brands = await brandModel.find({
    company_code,
  });

  return brands;
};
export const getall_cat_subcat = async (itemId, newData) => {
  try {
    const updateResult = await itemsModel.aggregate([
      {
        '$project': {
          '_id': 0, 
          'category_code': 1, 
          'sub_category_code': 1
        }
      }
    ])
    return {
      success: true,
      message: 'Data updated successfully',
      data: updateResult
    };
  } catch (error) {
    throw error;
  }
};