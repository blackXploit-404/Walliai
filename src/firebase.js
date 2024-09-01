// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth';

const firebaseConfig = { //add your own config
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

const registerWithEmailPassword = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(userCredential.user);
  return userCredential;
};

const loginWithEmailPassword = (email, password) => signInWithEmailAndPassword(auth, email, password);

const logOut = () => signOut(auth);

export {
  auth,
  signInWithGoogle,
  registerWithEmailPassword,
  loginWithEmailPassword,
  logOut  // Export the logOut function
};
