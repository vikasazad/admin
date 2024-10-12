import { compare } from "bcryptjs";
import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Profile from "./app/(dashboard)/Header/HeaderContent/Profile";
import { findIfStaffLogin, findUserByEmail } from "./app/DB/dbFunctions";
import { redirect } from "next/navigation";
import Otp from "./app/(dashboard)/test/OTP";
import { identifyAndParseEmail } from "./actions/loginAuth";
import { ConsoleView } from "react-device-detect";
// if role is admin then direct auth and login
// if email is not mainEmail or not in staff then -> email not found
// if email is not mainEmail but from staff then authenticate and redirect to create password page
// let the user login only when he is verified else throw error of please verify your email
// if registration done through any provider then we want be able to now anything about their business

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        console.log("From Auth", credentials);
        const email = credentials?.email;
        const password = credentials?.password as string;
        if (!email || !password) {
          throw new Error("Please provide both email and password");
        }

        const findEmail = await identifyAndParseEmail(email);
        if (findEmail.error) throw new Error("Invalid email type");

        if (findEmail.type === "normal") {
          console.log("INTHENORMAL");
          const existingUser = await findUserByEmail(findEmail.email);
          console.log("existingUser", existingUser);
          if (!existingUser || !existingUser.personalInfo.password) {
            // return {
            //   error: true,
            //   message: "Couldn't find your Buildbility Account!",
            // };
            throw new Error("Couldn't find for Buildbility Account!");
          }
          if (findEmail.email === existingUser.personalInfo.contactInfo.email) {
            console.log("COMPARING");
            if (await compare(password, existingUser.personalInfo.password)) {
              console.log("password", password);
              console.log("existingUser", existingUser.personalInfo.password);
              console.log("AUTHENTICATIG");
              return existingUser; // Return admin user if password matches
            }
            // throw new CredentialsSignin({
            //   cause: "Password is incorrect",
            // });
            else {
              console.log("WRONGPASSWORD");
              throw new Error("Couldn't find for Buildbility Account!");
            }
          }
        }

        if (findEmail.type === "special") {
          const existingAdmin = await findUserByEmail(findEmail.firstEmail);
          console.log("existingAdmin", existingAdmin);
          if (!existingAdmin)
            throw new Error("Couldn't find for Buildbility Account!");

          const isValidStaff = await findIfStaffLogin(
            findEmail.firstEmail,
            findEmail.secondEmail
          );
          console.log("isValidStaff", isValidStaff);
          if (!isValidStaff)
            throw new Error("Couldn't find for Buildbility Account!");

          if (findEmail.secondEmail === isValidStaff.email) {
            if (await compare(password, isValidStaff.password)) {
              return isValidStaff; // Return admin user if password matches
            } else throw new Error("Couldn't find for Buildbility Account!");
          }
        }

        return null; // Return the validated user
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const findUser = await findUserByEmail(user.email);
          if (findUser) {
            user.password = findUser.password ?? "";
            user.countryCode = findUser.countryCode;
            user.phone = findUser.phone;
            user.businessName = findUser.businessName;
            user.businessType = findUser.businessType;
            user.role = findUser.role;
            user.isverified = findUser.isverified;
            user.canForgotPassword = findUser.canForgotPassword;
            user.formattedNumber = findUser.formattedNumber;
            user.staff = findUser.staff;
          }
          user.newUser = !findUser;
        } catch (error) {
          console.error("Error finding user:", error);
          return false; // Stop sign-in if there's an error
        }
      }
      return true;
    },

    session: async ({ token, session }) => {
      if (token.sub && session.user) {
        session.user = { ...session.user, ...token };
      }
      return session;
    },

    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        token = { ...token, ...user };
      }
      if (trigger === "update") {
        // This will be run after using  update method
        console.log("Look its running");
        return { ...token, ...session.user };
      }
      return token;
    },
  },

  events: {
    async signIn({ isNewUser, profile, account, user }) {
      //3
      // console.log("isthis new user->>>>", {
      //   isNewUser: isNewUser, //given undefined
      //   Profile: profile, // gives provider details, email, important email_verified
      //   Account: account,
      //   User: user,
      // });
    },
  },
});
