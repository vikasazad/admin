"use server";

import { hash } from "bcryptjs";
import { generateVerificationToken } from "../app/utils/tokens";
import { findUserByEmail, registerUser } from "../app/DB/dbFunctions";
import { countriesList } from "../app/assets/countriesData";

export async function authEmailOtp(email) {
  const verificationToken = await generateVerificationToken(email); //checked returning verification token
  if (!verificationToken) {
    return false;
  }
  return verificationToken;
}

export async function saveUser(UserData) {
  const countryName = () => {
    const name = countriesList.find(
      (item) => item.phone === UserData.countryCode || ""
    );
    return name?.label;
  };
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
    personalInfo: {
      ownerName: `${firstname} ${lastname}`,
      country: "",
      zipCode: "",
      contactInfo: {
        countryCode: countryCode,
        phoneNumber: phone,
        email: email,
      },
      address: "",
      password: hashedPassword,
    },
    hotel: {},
    restaurant: {},
    business: {
      id: email,
      businessName: businessName,
      businessType: businessType,
      role: "admin",
      isVerified: JSON.stringify(new Date()),
      canForgotPassword: true,
      formattedNumber: formattedNumber,
      image: "",
      newUser: false,
      gst: "",
      countryCode: countryCode,
      phone: "",
      email: "",
      password: "",
      panNo: "",
    },
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
    personalInfo: {
      ownerName: `${firstname} ${lastname}`,
      country: "",
      zipCode: "",
      contactInfo: {
        countryCode: countryCode,
        phoneNumber: phone,
        email: email,
      },
      address: "",
      password: "",
    },
    hotel: {},
    restaurant: {},
    business: {
      id: email,
      businessName: businessName,
      businessType: businessType,
      role: "admin",
      isVerified: JSON.stringify(new Date()),
      canForgotPassword: true,
      formattedNumber: formattedNumber,
      image: "",
      newUser: false,
      gst: "",
      countryCode: countryCode,
      phone: "",
      email: "",
      password: "",
      panNo: "",
    },
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
