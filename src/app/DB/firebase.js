import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCR2dPx_So4JKofLQ63fd1xXet3gnC7tI0",
  authDomain: "bottest-2bb43.firebaseapp.com",
  projectId: "bottest-2bb43",
  storageBucket: "bottest-2bb43.appspot.com",
  messagingSenderId: "868396881763",
  appId: "1:868396881763:web:53f1464fbf89a834e3a556",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
