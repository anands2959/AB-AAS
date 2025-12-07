import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

// Validate Firebase configuration
if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  console.error('❌ Firebase configuration missing!');
  console.error('Please create .env.local file with your Firebase credentials.');
  console.error('See .env.example for template.');
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp;
let db: Firestore;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log('✅ Firebase initialized successfully');
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
    throw error;
  }
} else {
  app = getApps()[0];
  db = getFirestore(app);
}

export { app, db };
