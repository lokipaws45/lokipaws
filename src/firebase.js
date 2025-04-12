// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCWOlRZV38KcvpDg1rMLyONOUmN5eUu1Qs",
  authDomain: "lokipawsorders.firebaseapp.com",
  projectId: "lokipawsorders-b4470",
  storageBucket: "lokipawsorders-b4470.appspot.com",
  messagingSenderId: "977549459382",
  appId: "1:977549459382:web:c25e3d44e6ca9e580a0b17"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
