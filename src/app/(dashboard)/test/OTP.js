// '"use client";
// import { useState } from "react";
// import { authentication } from "../../DB/firebase"; // Import your firebase config
// import {
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
//   PhoneAuthProvider,
//   signInWithCredential,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
// } from "firebase/auth"; // Import required functions

// const OtpAuth = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [verificationId, setVerificationId] = useState(null);
//   const [error, setError] = useState(null);

//   const signInWithEmail = async () => {
//     console.log(email, password);
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         authentication,
//         email,
//         password
//       );
//       console.log("Email authentication successful:", userCredential.user);
//       // Proceed with phone number verification
//       return userCredential.user;
//     } catch (error) {
//       console.error("Error signing in:", error);
//     }
//   };
//   return (
//     <div>
//       <h2>Phone Authentication</h2>
//       <div>
//         <input
//           type="text"
//           placeholder="Enter phone number"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Enter phone number"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button onClick={signInWithEmail}>Request OTP</button>
//       </div>
//     </div>
//   );
// };

// export default OtpAuth;
"use server";
import { findUserByEmail } from "../../DB/dbFunctions";

export default async function Otp(email) {
  const user = await findUserByEmail(email);
  console.log("sdjfasdfhslfhslkfhsadlkfashfklsf", user);
}
