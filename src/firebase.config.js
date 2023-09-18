import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyD0DL3xwJzWt8Y4VSEbtmF4NinoRdryUV8",
  authDomain: "e-commercereactjs-da89c.firebaseapp.com",
  projectId: "e-commercereactjs-da89c",
  storageBucket: "e-commercereactjs-da89c.appspot.com",
  messagingSenderId: "745579167007",
  appId: "1:745579167007:web:7c03d94d78eb4590a6042a",
  measurementId: "G-VB76ZPSZ0W",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
