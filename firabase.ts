import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.API_KEY_FIREBASE,
    authDomain: process.env.AUTH_DOMAIN_FIREBASE,
    projectId: process.env.PROJECT_ID_FIREBASE,
    storageBucket: process.env.STORAGE_BUCKET_FIREBASE,
    messagingSenderId: process.env.MESSAGIN_SANDER_ID_FIREBASE,
    appId: process.env.APP_ID_FIREBASE,
    measurementId: process.env.MEASUREMENT_ID_FIREBASE
  };