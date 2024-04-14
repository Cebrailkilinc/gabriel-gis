// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1W-qK1g-Bjev-NWWXxESUUtaRv5OfKvk",
  authDomain: "ggis-d282d.firebaseapp.com",
  projectId: "ggis-d282d",
  storageBucket: "ggis-d282d.appspot.com",
  messagingSenderId: "509191602051",
  appId: "1:509191602051:web:464634f8fdba2c102180b6",
  measurementId: "G-TBH0BMY5SL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const modelDb = getStorage(app)
export const db = getFirestore(app)