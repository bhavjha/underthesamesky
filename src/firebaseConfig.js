// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

import { getDatabase } from "firebase/database"; //realtime


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXu2nbcdrcyy7pL895CNpYkWqYH2X_xQE",
  authDomain: "underthesamesky-1c1bd.firebaseapp.com",
  projectId: "underthesamesky-1c1bd",
  storageBucket: "underthesamesky-1c1bd.appspot.com",
  messagingSenderId: "638411667928",
  appId: "1:638411667928:web:a518a994aedaba195d9aad",
  measurementId: "G-QJCLZJW1WC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 
// Firebase storage reference
const storage = getStorage(app);
export default storage;

// Firebase realtime storage
export const db = getDatabase(app); //realtime