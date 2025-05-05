import "client-only";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASUjmX8PrbH3CdauvB8PWRvQCYrB1KvdU",
  authDomain: "green-signal-troop.firebaseapp.com",
  projectId: "green-signal-troop",
  storageBucket: "green-signal-troop.firebasestorage.app",
  messagingSenderId: "630087341370",
  appId: "1:630087341370:web:7b47e56822a1e7b425ac03",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
