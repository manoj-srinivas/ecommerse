import Joi from "joi";

export const userSignupSchema = Joi.object({
  company_code: Joi.string().required(),
  user_name: Joi.string().required(),
  email: Joi.string().email().required(),
  //password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$"))
  password: Joi.string().required(),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  company_code: Joi.string().required()
  //password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$"))
});

export const getItemsSchema = Joi.object({
  company_code: Joi.string().required(),
  page: Joi.number().optional(),
  page_size: Joi.number().optional(),
  category_code: Joi.string().optional(),
  item_price_gt: Joi.number().optional(),
  item_price_lt: Joi.number().optional(),
  item_rating: Joi.number().optional(),
  search_key: Joi.string().optional(),
  sort_by: Joi.string().optional().valid("price_high", "price_low"),
});

export const getItemSchema = Joi.object({
  company_code: Joi.string().required(),
  item_code: Joi.string().required(),
});

export const addItemSchema = Joi.object({
  company_code: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  UOM: Joi.string().required(),
  item_type_code: Joi.string(),
  category_code: Joi.string(),
  sub_category_code: Joi.string(),
  brand_code: Joi.string().required(),
  purchase_price: Joi.number().required(),
  selling_price: Joi.number().required(),
  discount: Joi.number().optional(),
  primary_image: Joi.string().optional(),
});
export const deleteItemSchema = Joi.object({
  status: Joi.string().valid('ACTIVE', 'INACTIVE').required(),
  // itemId: Joi.string().required(),
});

export const customerSignupSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  phone_number: Joi.number().required(),
  country_code: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
  company_code: Joi.number().required(),
});

export const customerSigninSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  company_code: Joi.string().required(),
  //password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$"))
});

export const addToCartSchema = Joi.object({
  item_code: Joi.string().required(),
  company_code: Joi.string().required(),
  quantity: Joi.number().required(),
  customer_code: Joi.string().required(),
});
export const cat_subcat_schema = Joi.object({
  company_code: Joi.string().required()
});

export const getCartItemsSchema = Joi.object({
  customer_code: Joi.string().required(),
  company_code: Joi.string().required(),
});

export const addressSchemaValidations = Joi.object({
  street_1: Joi.string().required(),
  street_2: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zip_code: Joi.number().required(),
  phone_number: Joi.number().required(),
  type: Joi.number().required().valid("home", "office"),
  is_default_address: Joi.boolean().required(),
});

export const updateAddressSchemaValidations = Joi.object({
  street_1: Joi.string().optional(),
  street_2: Joi.string().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  zip_code: Joi.number().optional(),
  phone_number: Joi.number().optional(),
  type: Joi.number().optional().valid("home", "office"),
  is_default_address: Joi.boolean().optional(),
});

export const addPaymentSchema = Joi.object({
  card_type: Joi.string().required().valid("credit", "debit"),
  card_holder_name: Joi.string().required(),
  card_number: Joi.number().required(),
  cvv: Joi.number().required(),
  exp_year: Joi.number().required(),
  exp_month: Joi.number().required(),
});

export const updatePaymentSchema = Joi.object({
  card_type: Joi.string().optional().valid("credit", "debit"),
  card_holder_name: Joi.string().optional(),
  card_number: Joi.number().optional(),
  cvv: Joi.number().optional(),
  exp_year: Joi.number().optional(),
  exp_month: Joi.number().optional(),
});

export const updateCustomerSchema = Joi.object({
  first_name: Joi.string().optional(),
  last_name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone_number: Joi.number().optional(),
});

export const updatePasswordSchema = Joi.object({
  password: Joi.string().required(),
  existing_password: Joi.string().required(),
});

export const supplierSchema = Joi.object({
  password: Joi.string().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone_number: Joi.number().required(),
  country_code: Joi.string().required(),
  company_code: Joi.string().required(),
  street_1: Joi.string().required(),
  street_2: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zip_code: Joi.string().required(),
  // status: Joi.string().valid('ACTIVE', 'INACTIVE').required(),
  company_name: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  gst_no: Joi.string().required(),
});
export const editSupplierSchema = Joi.object({
  first_name: Joi.string().optional(),
  last_name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone_number: Joi.string().optional(),
  country_code: Joi.string().optional(),
  company_code: Joi.string().optional(),
  street_1: Joi.string().optional(),
  street_2: Joi.string().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  zip_code: Joi.string().optional(),
  status: Joi.string().valid('ACTIVE', 'INACTIVE').optional(),
  company_name: Joi.string().optional(),
  latitude: Joi.number().optional(),
  longitude: Joi.number().optional(),
  gst_no: Joi.string().optional(),
});
export const getsupplierSchema = Joi.object({
  company_code: Joi.string().required(),
});

export const deleteSupplierSchema = Joi.object({
  status: Joi.string().valid('ACTIVE', 'INACTIVE').required(),
});
export const editOrderSchema = Joi.object({
  status: Joi.string().valid('ACTIVE', 'INACTIVE').required(),
  // itemId: Joi.string().required(),
});
export const getSingleOrderSchema = Joi.object({
  // company_code: Joi.string().required(),
  order_id: Joi.string().required(),
});
