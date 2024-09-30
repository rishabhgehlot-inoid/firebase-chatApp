// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaIntJ5eggu43Dq-r0srQpdIbLI7-uLRs",
  authDomain: "chatapp-14f86.firebaseapp.com",
  projectId: "chatapp-14f86",
  storageBucket: "chatapp-14f86.appspot.com",
  messagingSenderId: "425962506470",
  appId: "1:425962506470:web:2ba99420c1129cc6625327",
  databaseURL: "https://chatapp-14f86-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);

export { auth, db, database };
