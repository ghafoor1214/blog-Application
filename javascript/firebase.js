
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
 
  import { 
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    setDoc,
    getDoc,
 } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
 
 import{
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
 
  import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBJZCiqQsHog4SDS8Ezk5BbuOoG5iEBJc4",
    authDomain: "my-app-3aba0.firebaseapp.com",
    projectId: "my-app-3aba0",
    storageBucket: "my-app-3aba0.appspot.com",
    messagingSenderId: "1096328887215",
    appId: "1:1096328887215:web:7469569882f31a5c65cd5a",
    measurementId: "G-ZWRV9SDY9C"
  };
  
  const app = initializeApp(firebaseConfig);
  // Initialization of FireStore
  const db = getFirestore(app);
  // Initialization of auth
  const auth = getAuth(app);
  // Initialization of storage
  const storage = getStorage(app);

  export {
    app,
    db,
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    setDoc,
    getDoc,
    storage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  };