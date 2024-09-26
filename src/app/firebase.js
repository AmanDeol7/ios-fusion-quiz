// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcbmosIT0U5e-gxRtOe7fa_FIHt8U4qfw",
  authDomain: "iod-fusion-quiz.firebaseapp.com",
  projectId: "iod-fusion-quiz",
  storageBucket: "iod-fusion-quiz.appspot.com",
  messagingSenderId: "806792814798",
  appId: "1:806792814798:web:6557d416d37082bb7ef09f",
  measurementId: "G-T0QHRH3DJB"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
