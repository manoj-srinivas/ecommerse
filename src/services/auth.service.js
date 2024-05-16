import { padDigits } from "../helpers/common.js";
import { generateToken } from "../middlewares/authorization.js";
import customersModel from "../models/customers.model.js";
import usersModel from "../models/users.model.js";

export const signUp = async (user_name, email, password, company_code) => {
  const existingUser = await usersModel.findOne({
    email,
    company_code: company_code,
  });
  if (!existingUser) {
    const user = usersModel({
      user_name,
      email,
      password,
      company_code,
    });
    const data = await user.save();
    return {
      user_name: data._doc["user_name"],
      password: data._doc["password"],
      email: data._doc["email"],
      company_code: data._doc["company_code"],
      _id: data._doc["_id"],
      token: generateToken(data),
    };
  } else {
    return null;
  }
};

export const signIn = async (email, password, company_code) => {
  console.log(email, password, company_code);

  const userDetails = await usersModel.findOne(
    {
      email,
      password,
      company_code,
    },
    { _id: 1, name: 1, email: 1, company_code: 11 }
  );
  console.log(userDetails);
  if (userDetails) {
    return {
      ...userDetails._doc,
      token: generateToken(userDetails),
    };
  } else {
    return null;
  }
};

export const customerSignUp = async (query) => {
  const {
    first_name,
    last_name,
    phone_number,
    email,
    password,
    company_code,
    country_code,
  } = query;

  const existingUser = await customersModel.findOne({
    $or: [{ email }, { phone_number }, { password }],
    company_code: company_code,
  });

  const customers = await customersModel.find({
    company_code,
  });

  if (!existingUser) {
    const customerCode = padDigits(customers.length + 1, 6);

    const user = customersModel({
      customer_code: customerCode,
      first_name,
      last_name,
      phone_number,
      country_code,
      email,
      password,
      company_code,
      status: "active",
    });

    const data = await user.save();
    return {
      user_name: data._doc["first_name"],
      last_name: data._doc["last_name"],
      email: data._doc["email"],
      phone_number: data._doc["phone_number"],
      country_code: data._doc["country_code"],
      company_code: data._doc["company_code"],
      customer_code: data._doc["customer_code"],
      token: generateToken(data),
    };
  } else {
    return null;
  }
};

export const customerSignIn = async (query) => {
  const { email, password, company_code } = query;

  const userDetails = await customersModel.findOne(
    {
      email,
      password,
      company_code,
    },
    {
      customer_code: 1,
      first_name: 1,
      last_name: 1,
      email: 1,
      phone_number: 1,
      country_code: 1,
      company_code: 1,
    }
  );
  if (userDetails) {
    return {
      ...userDetails._doc,
      token: generateToken(userDetails),
    };
  } else {
    return null;
  }
};

