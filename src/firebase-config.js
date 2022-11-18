import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {

    apiKey: "AIzaSyC2otW3kb7ttK1U1_x8krx05bwYHAhf5Y4",  
    authDomain: "wizchat-a2d85.firebaseapp.com", 
    projectId: "wizchat-a2d85",
    storageBucket: "wizchat-a2d85.appspot.com",
    messagingSenderId: "458252889163",
    appId: "1:458252889163:web:6e95b159a9c43f3b80f1ce",
    measurementId: "G-GK93Y535GN"
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();