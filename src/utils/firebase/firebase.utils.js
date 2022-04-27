import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider 
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDLztld7L7nqg12JDGy3_dVZoZDqSe89q0",
    authDomain: "crown-clothing-db-c453a.firebaseapp.com",
    projectId: "crown-clothing-db-c453a",
    storageBucket: "crown-clothing-db-c453a.appspot.com",
    messagingSenderId: "66245472500",
    appId: "1:66245472500:web:a6d81c57e8a7f02bc82ea1"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
      prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);