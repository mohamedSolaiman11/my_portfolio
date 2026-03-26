// Centralized Firebase Configuration & Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAFGihdfZEWJM7iJYh45wRWYCYphVG4-G0",
    authDomain: "portfolio-9fd63.firebaseapp.com",
    projectId: "portfolio-9fd63",
    storageBucket: "portfolio-9fd63.appspot.com",
    messagingSenderId: "562837517190",
    appId: "1:562837517190:web:173b5edb9f4ebdafdf7207"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, orderBy };
