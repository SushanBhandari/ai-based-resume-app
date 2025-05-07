// firebase/config.ts
import { initializeApp, getApps } from 'firebase/app';

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

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
