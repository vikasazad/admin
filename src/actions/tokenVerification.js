import { findTokenByEmail, findUserByToken } from "../app/DB/dbFunctions";

export const getVerificationTokenByEmail = async (email) => {
  try {
    const verificationToken = await findTokenByEmail(email);
    console.log(verificationToken);
    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByToken = async (email, token) => {
  try {
    const verificationToken = await findUserByToken(email, token);
    return verificationToken;
  } catch {
    return null;
  }
};
