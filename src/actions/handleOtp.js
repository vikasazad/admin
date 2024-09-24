import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { authentication } from "../app/DB/firebase";
import toast from "react-hot-toast";
let appVerifier;
const setupRecaptcha = () => {
  if (window.recaptchaVerifier) {
    window.recaptchaVerifier.clear();
  }
  window.recaptchaVerifier = new RecaptchaVerifier(
    authentication,
    "recaptcha-container",
    {
      size: "invisible",
      callback: (response) => {
        console.log("Recaptcha Resolved");
      },
      "expired-callback": () => {
        console.log("Recaptcha Expired");
        window.recaptchaVerifier.reset();
      },
    }
  );
};

export const authPhoneOtp = (formattedNumber) => {
  return new Promise((resolve, reject) => {
    setupRecaptcha();
    appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(authentication, formattedNumber, appVerifier)
      .then((confirmationResult) => {
        toast.success("Otp sent successfully");
        resolve({
          verificationProcess: null,
          verificationId: confirmationResult.verificationId,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error during OTP request");
        if (err.code === "auth/invalid-phone-number") {
          toast.error("Invalid phone number. Please check the number.");
        } else if (err.code === "auth/too-many-requests") {
          toast.error("Too many requests. Please try again later.");
        } else {
          toast.error("Failed to send OTP. Please try again.");
        }
        reject(new Error(err.message));
      });
  });
};

export const resendOtp = (formattedNumber) => {
  return new Promise((resolve, reject) => {
    appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(authentication, formattedNumber, appVerifier)
      .then((confirmationResult) => {
        toast.success("Otp sent successfully");
        resolve({
          verificationProcess: null,
          verificationId: confirmationResult.verificationId,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error during OTP request");
        if (err.code === "auth/invalid-phone-number") {
          toast.error("Invalid phone number. Please check the number.");
        } else if (err.code === "auth/too-many-requests") {
          toast.error("Too many requests. Please try again later.");
        } else {
          toast.error("Failed to send OTP. Please try again.");
        }
        reject(new Error(err.message));
      });
  });
};

export const verifyOtp = (error, verificationId, phoneOtp) => {
  return new Promise((resolve, reject) => {
    if (!error) {
      const credential = PhoneAuthProvider.credential(verificationId, phoneOtp);

      signInWithCredential(authentication, credential)
        .then((result) => {
          toast.success("Phone number verified!");
          // console.log(result.user);
          resolve(true);
        })
        .catch((err) => {
          console.error("Error during OTP verification", err);
          if (err.code === "auth/invalid-verification-code") {
            toast.error("Incorrect OTP");
          } else if (
            errorCode === "auth/account-exists-with-different-credential"
          ) {
            toast.error(
              "Phone number already associated with another account."
            );
          } else {
            toast.error("Error during OTP verification");
          }
          reject(false);
        });
    }
  });
};
