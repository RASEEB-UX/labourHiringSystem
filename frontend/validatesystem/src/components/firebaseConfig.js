// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
    apiKey: "AIzaSyA8TSTm6_cQZI-jopxdt0D_GQ6qC1oFnmA",
    authDomain: "labourhiring-7a582.firebaseapp.com",
    projectId: "labourhiring-7a582",
    storageBucket: "labourhiring-7a582.appspot.com",
    messagingSenderId: "1029720545395",
    appId: "1:1029720545395:web:5089e415a5c463efda7206",
    measurementId: "G-5GCQVW6Y6C"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app