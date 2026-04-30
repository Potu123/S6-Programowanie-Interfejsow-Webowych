// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOs0eQ6nFAT4xyul6sUX-i7Z0zqdoELWo",
  authDomain: "lab4-i-dalej.firebaseapp.com",
  projectId: "lab4-i-dalej",
  storageBucket: "lab4-i-dalej.firebasestorage.app",
  messagingSenderId: "246774819204",
  appId: "1:246774819204:web:eaed10e26b4d7771e515d1",
  measurementId: "G-DMBGVL5N00"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
//const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, auth, db };