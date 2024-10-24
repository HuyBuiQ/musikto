// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "musikto-52535.firebaseapp.com",
  projectId: "musikto-52535",
  storageBucket: "musikto-52535.appspot.com",
  messagingSenderId: "562069609946",
  appId: "1:562069609946:web:af2822939d9c03c55c34e3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);