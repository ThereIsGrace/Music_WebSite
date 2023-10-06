// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAltdletjgW6d8QpwctpURh7Me5GnfbToM",
  authDomain: "musicwebsite-951d1.firebaseapp.com",
  projectId: "musicwebsite-951d1",
  storageBucket: "musicwebsite-951d1.appspot.com",
  messagingSenderId: "690926548736",
  appId: "1:690926548736:web:3b2299156345feefeae5e5",
  measurementId: "G-WPKWX1CH4G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
//const analytics = getAnalytics(app);