// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABqdCVDG_JdLMyd-iSykM_TvghrGsnCNU",
  authDomain: "portfoilo-dd5cf.firebaseapp.com",
  databaseURL: "https://portfoilo-dd5cf-default-rtdb.firebaseio.com",
  projectId: "portfoilo-dd5cf",
  storageBucket: "portfoilo-dd5cf.appspot.com",
  messagingSenderId: "13818110944",
  appId: "1:13818110944:web:44643b95876a202d60c185",
  measurementId: "G-ZRD7QR6NHH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
