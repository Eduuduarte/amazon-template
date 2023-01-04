import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: process.env.API_KEY_FIREBASE,
    authDomain: process.env.AUTH_DOMAIN_FIREBASE,
    projectId: process.env.PROJECT_ID_FIREBASE,
    storageBucket: process.env.STORAGE_BUCKET_FIREBASE,
    messagingSenderId: process.env.MESSAGIN_SANDER_ID_FIREBASE,
    appId: process.env.APP_ID_FIREBASE,
    measurementId: process.env.MEASUREMENT_ID_FIREBASE
};

const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;