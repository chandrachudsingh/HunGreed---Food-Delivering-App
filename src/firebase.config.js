import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDf7Yu4NKCHy8zTfoV7fKj0N51WMYyzZeo",
  authDomain: "hungreed-99.firebaseapp.com",
  databaseURL: "https://hungreed-99-default-rtdb.firebaseio.com",
  projectId: "hungreed-99",
  storageBucket: "hungreed-99.appspot.com",
  messagingSenderId: "612043365336",
  appId: "1:612043365336:web:d1f4551df3daf02e5db0ad",
  measurementId: "G-2WGLLPPGTF",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
