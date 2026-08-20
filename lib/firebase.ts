import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDBEcFsCUwLMlRVwxqK4hJTbnsM8ObX6c",
  authDomain: "ghstore-b5863.firebaseapp.com",
  projectId: "ghstore-b5863",
  storageBucket: "ghstore-b5863.firebasestorage.app",
  messagingSenderId: "1016939349704",
  appId: "1:1016939349704:web:d19890ff6ab1f92b4587fd",
  measurementId: "G-5BTXJXMHW1"
};

// Initialize Firebase only if it hasn't been initialized already (Next.js SSR safety)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };