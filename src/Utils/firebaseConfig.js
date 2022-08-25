import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBS1sE_8TrN6gpr1wV89Si0AqpL_WIj6Pk",
  authDomain: "sihnew-c89ee.firebaseapp.com",
  projectId: "sihnew-c89ee",
  storageBucket: "sihnew-c89ee.appspot.com",
  messagingSenderId: "717092024946",
  appId: "1:717092024946:web:0075a613067cd84e2e48eb",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
