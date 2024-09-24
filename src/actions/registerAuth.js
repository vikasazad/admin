"use server";

import { hash } from "bcryptjs";
import { generateVerificationToken } from "../app/utils/tokens";
import { findUserByEmail, registerUser } from "../app/DB/dbFunctions";

export async function authEmailOtp(email) {
  const verificationToken = await generateVerificationToken(email); //checked returning verification token
  if (!verificationToken) {
    return false;
  }
  return verificationToken;
}

export async function saveUser(UserData) {
  const firstname = UserData.firstname;
  const lastname = UserData.lastname;
  const email = UserData.email;
  const countryCode = UserData.countryCode;
  const phone = UserData.phone;
  const businessName = UserData.businessName;
  const password = UserData.password;
  const businessType = UserData.businessType;
  const formattedNumber = UserData.formattedNumber;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !businessName ||
    !password ||
    !countryCode ||
    !phone ||
    !businessType ||
    !formattedNumber
  ) {
    return false;
  }
  const hashedPassword = await hash(password, 8);
  const newUser = {
    id: email,
    name: `${firstname} ${lastname}`,
    email: email,
    password: hashedPassword,
    countryCode: countryCode,
    phone: phone,
    businessName: businessName,
    businessType: businessType,
    role: "admin",
    isverified: JSON.stringify(new Date()),
    canForgotPassword: true,
    formattedNumber: formattedNumber,
    image: "",
    newUser: false,
    staff: [],
  };

  const findUserEmail = await findUserByEmail(email);
  if (findUserEmail) {
    return {
      error: true,
      message: "User already registered!",
    };
  }
  const isUserRegistered = await registerUser(email, newUser);
  console.log("+++", isUserRegistered);
  if (!isUserRegistered) {
    return { error: true, message: "User registration failed" };
  } else {
    return {
      error: false,
      message: isUserRegistered,
    };
  }
}

export async function registerSocialUser(user) {
  const name = user.name;
  const email = user.email;
  const countryCode = user.countryCode;
  const phone = user.phone;
  const businessName = user.businessName;
  const businessType = user.businessType;
  const image = user.image;
  const role = user.role;
  const formattedNumber = user.formattedNumber;

  if (
    !name ||
    !email ||
    !businessName ||
    !countryCode ||
    !phone ||
    !businessType ||
    !formattedNumber ||
    !image ||
    !role
  ) {
    return false;
  }

  const newUser = {
    id: email,
    name: name,
    email: email,
    password: "",
    countryCode: countryCode,
    phone: phone,
    businessName: businessName,
    businessType: businessType,
    role: role,
    isverified: JSON.stringify(new Date()),
    canForgotPassword: true,
    formattedNumber: formattedNumber,
    image: image,
    newUser: false,
    staff: [],
  };

  const isUserRegistered = await registerUser(email, newUser);
  if (!isUserRegistered) {
    return { error: true, message: "User registration failed" };
  } else {
    return {
      error: false,
      message: isUserRegistered,
    };
  }
}
