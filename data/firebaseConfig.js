// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTA8WwfyTbgJFbLh1lByC1Uki0rbkLETE",
  authDomain: "yuryicoffeeapp.firebaseapp.com",
  projectId: "yuryicoffeeapp",
  storageBucket: "yuryicoffeeapp.appspot.com",
  messagingSenderId: "742940911671",
  appId: "1:742940911671:web:ac1a6dddb8ec8f1652f7b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;