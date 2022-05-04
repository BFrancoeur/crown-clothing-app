import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDLztld7L7nqg12JDGy3_dVZoZDqSe89q0",
    authDomain: "crown-clothing-db-c453a.firebaseapp.com",
    projectId: "crown-clothing-db-c453a",
    storageBucket: "crown-clothing-db-c453a.appspot.com",
    messagingSenderId: "66245472500",
    appId: "1:66245472500:web:a6d81c57e8a7f02bc82ea1"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
      prompt: 'select_account',
    });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}
  ) => {

    if (!userAuth) return;

    const userDocRef = doc( db, 'users',  userAuth.uid );
    // console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    // console.log("User Snapshot: " + userSnapshot);
    // console.log(userSnapshot.exists);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            } )
        } catch (error) {
            console.log("Error creating user ", error.message);
        }
    }

    return userDocRef;
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {

    if ( !email || !password ) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  }

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {

    if ( !email || !password ) return;

    return await signInWithEmailAndPassword(auth, email, password);
  }

