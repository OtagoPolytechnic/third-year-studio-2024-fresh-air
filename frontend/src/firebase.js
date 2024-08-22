import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore, persistentLocalCache } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC_b5U88i3Jep9EQ-Pg6l8e6d_3ixHLKQU",
  authDomain: "co2-app-9ad39.firebaseapp.com",
  projectId: "co2-app-9ad39",
  storageBucket: "co2-app-9ad39.appspot.com",
  messagingSenderId: "764101616649",
  appId: "1:764101616649:web:1d3ab2115d255ad746c4d8"
};


const app = initializeApp(firebaseConfig);

initializeFirestore(app, {
    localCache: persistentLocalCache(),
  });

export const auth = getAuth();
export const firestore = getFirestore(app);