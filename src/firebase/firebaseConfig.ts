// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtTN8jiXg0IxY7PdDUUCCmRlP5aAe5o00",
  authDomain: "new-notes-6153d.firebaseapp.com",
  projectId: "new-notes-6153d",
  storageBucket: "new-notes-6153d.appspot.com",
  messagingSenderId: "590155988484",
  appId: "1:590155988484:web:85966f7758977d630eff51"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const database = getDatabase(app)