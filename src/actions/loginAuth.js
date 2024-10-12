"use server";

import { AuthError } from "next-auth";
import { signIn } from "../auth";
import { findIfStaffLogin, findUserByEmail } from "../app/DB/dbFunctions";

export async function LoginAuth(LoginData) {
  console.log("LoginData", LoginData);
  const email = LoginData.email;
  const password = LoginData.password;
  let defaultRoute;

  if (!email || !password) throw new Error("Please provide all fields");

  function identifyAndParseEmail(email) {
    const normalEmailPattern =
      /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    const specialEmailPattern =
      /^staff\/([a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+\.[a-zA-Z]{2,})\/([a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+\.[a-zA-Z]{2,})$/;

    if (normalEmailPattern.test(email)) {
      return { type: "normal", email };
    }

    const match = specialEmailPattern.exec(email);
    if (match) {
      const firstEmail = match[1];
      const secondEmail = match[3];
      return {
        type: "special",
        staff: "staff",
        firstEmail,
        secondEmail,
      };
    }

    return { error: "Invalid email format" };
  }

  const findUser = identifyAndParseEmail(email);
  if (findUser.error) return false;

  if (findUser.type === "normal") {
    const existingUser = await findUserByEmail(findUser.email);
    console.log("existingUser", existingUser);
    if (!existingUser) {
      return {
        error: true,
        message: "Couldn't find your Buildbility Account!",
      };
    }
    defaultRoute = "/";
  }

  if (findUser.type === "special") {
    const existingAdmin = await findUserByEmail(findUser.firstEmail);
    if (!existingAdmin) {
      return {
        error: true,
        message: "Couldn't find your Buildbility Account!",
      };
    }
    const isValidStaff = await findIfStaffLogin(
      findUser.firstEmail,
      findUser.secondEmail
    );
    if (!isValidStaff) {
      return {
        error: true,
        message: "Couldn't find your Buildbility Account!",
      };
    }
    defaultRoute = "/staff";
  }

  console.log("defaultRoute", defaultRoute);
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: defaultRoute,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return {
            error: true,
            message: "Invalid Credentials!",
          };
        default:
          return {
            error: true,
            message: "Something went wrong!",
          };
      }
    }

    throw err;
  }
}

export async function identifyAndParseEmail(email) {
  const normalEmailPattern =
    /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
  const specialEmailPattern =
    /^staff\/([a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+\.[a-zA-Z]{2,})\/([a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+\.[a-zA-Z]{2,})$/;

  if (normalEmailPattern.test(email)) {
    return { type: "normal", email };
  }

  const match = specialEmailPattern.exec(email);
  if (match) {
    const firstEmail = match[1];
    const secondEmail = match[3];
    return {
      type: "special",
      staff: "staff",
      firstEmail,
      secondEmail,
    };
  }

  return { error: "Invalid email format" };
}
