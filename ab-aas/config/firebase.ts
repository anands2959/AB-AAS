import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGPmj3LC0P38shHOsrQUmNuYgOI0Rv01E",
  authDomain: "ab-aas.firebaseapp.com",
  projectId: "ab-aas",
  storageBucket: "ab-aas.firebasestorage.app",
  messagingSenderId: "352025947844",
  appId: "1:352025947844:web:ffd3c9bb743a998b62a391",
  measurementId: "G-JYB82Z5EV1"
};

// Initialize Firebase only if not already initialized
let app;
if (getApps().length === 0) {
  try {
    app = initializeApp(firebaseConfig);
    console.log('✅ Firebase initialized successfully');
  } catch (error) {
    console.error('❌ Firebase initialization error:', error);
    throw error;
  }
} else {
  app = getApps()[0];
  console.log('✅ Firebase already initialized');
}

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;
