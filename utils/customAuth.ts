import { db } from '../firebase/config';
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  addDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const usersRef = collection(db, 'users');

export const signUpUser = async (email: string, password: string, name: string) => {
  const q = query(usersRef, where('email', '==', email));
  const existing = await getDocs(q);

  if (!existing.empty) throw new Error('User already exists');

  const user = {
    email,
    password,
    name,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(usersRef, user);
  await AsyncStorage.setItem('userId', docRef.id);

  return { id: docRef.id, ...user };
};

export const loginUser = async (email: string, password: string) => {
  const q = query(usersRef, where('email', '==', email), where('password', '==', password));
  const res = await getDocs(q);

  if (res.empty) throw new Error('Invalid credentials');

  const user = res.docs[0];
  await AsyncStorage.setItem('userId', user.id);
  return { id: user.id, ...user.data() };
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem('userId');
};

export const getCurrentUser = async () => {
  const id = await AsyncStorage.getItem('userId');
  if (!id) return null;

  const userDoc = await getDoc(doc(db, 'users', id));
  if (!userDoc.exists()) return null;

  return { id: userDoc.id, ...userDoc.data() };
};
