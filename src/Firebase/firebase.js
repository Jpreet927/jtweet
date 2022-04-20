import firebase from 'firebase/app'
import 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth';

const appConfig = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});

const db = appConfig.firestore();
const auth = appConfig.auth();
const storage = appConfig.storage();
const provider = new GoogleAuthProvider();

export { db, auth, storage, provider }