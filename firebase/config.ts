// firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyApwjMzf9q7LbkmVVASRjT1alHJQSwt2yM',
  authDomain: 'ai-based-resume-builder-a27fb.firebaseapp.com',
  databaseURL: 'https://ai-based-resume-builder-a27fb-default-rtdb.firebaseio.com',
  projectId: 'ai-based-resume-builder-a27fb',
  storageBucket: 'ai-based-resume-builder-a27fb.firebasestorage.app',
  messagingSenderId: '956951920244',
  appId: '1:956951920244:web:35cc49d8c5e7261a5b5b21',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
