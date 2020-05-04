import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBzHCW0SpShJfSpR-RzrW6GADtgXgz4uIQ",
  authDomain: "clothing-store-76180.firebaseapp.com",
  databaseURL: "https://clothing-store-76180.firebaseio.com",
  projectId: "clothing-store-76180",
  storageBucket: "clothing-store-76180.appspot.com",
  messagingSenderId: "692438638046",
  appId: "1:692438638046:web:005c8b49e62c4bf87f514f",
  measurementId: "G-44SHC56HKV"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
 
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  
  if(!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;