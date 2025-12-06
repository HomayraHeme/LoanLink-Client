// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDwYQH2-J8FCEzgi2MNN0l9E-nJKWxJH0s",
    authDomain: "loanlink-49d90.firebaseapp.com",
    projectId: "loanlink-49d90",
    storageBucket: "loanlink-49d90.firebasestorage.app",
    messagingSenderId: "663418937058",
    appId: "1:663418937058:web:175d5c8645d62e96f488bb",
    measurementId: "G-B8G8M4JRFG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);





