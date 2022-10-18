// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjwi_8atqRY5DisHgy_P8DuhIO28M2CEk",
  authDomain: "pubgmap-aaa37.firebaseapp.com",
  projectId: "pubgmap-aaa37",
  storageBucket: "pubgmap-aaa37.appspot.com",
  messagingSenderId: "423354037773",
  appId: "1:423354037773:web:fbcc89f178a39b11bac744",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
