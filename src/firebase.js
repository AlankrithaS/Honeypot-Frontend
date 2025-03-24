import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { getDatabase, ref, onValue } from "firebase/database";

// ✅ Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com", // ✅ For Realtime Database
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 
const realtimeDb = getDatabase(app); 

// ✅ Firestore Real-Time Subscription
export const subscribeToFirestoreAttacks = (callback) => {
  try {
    const attacksCollection = collection(db, "attacks");
    const unsubscribe = onSnapshot(attacksCollection, (snapshot) => {
      const attackData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      callback(attackData);
    });
    return unsubscribe; // ✅ Properly return unsubscribe function
  } catch (error) {
    console.error("Error subscribing to Firestore attacks:", error);
    return () => {}; // ✅ Return empty function if error occurs
  }
};

// ✅ Realtime Database Subscription
export const subscribeToRealTimeAttacks = (callback) => {
  try {
    const attacksRef = ref(realtimeDb, "attacks");
    const unsubscribe = onValue(attacksRef, (snapshot) => {
      callback(snapshot.val() || []);
    });

    return () => unsubscribe(); // ✅ Ensure unsubscribe is returned properly
  } catch (error) {
    console.error("Error subscribing to Realtime Database attacks:", error);
    return () => {}; // ✅ Return empty function if error occurs
  }
};

export { db, realtimeDb };
