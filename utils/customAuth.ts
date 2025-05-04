import { db } from '../firebase/config';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const usersRef = collection(db, 'users');

export const signUpUser = async (email: string, password: string, name: string) => {
  // Check if user exists
  const q = query(usersRef, where('email', '==', email));
  const existing = await getDocs(q);

  if (!existing.empty) throw new Error('User already exists');

  // Create user
  const user = {
    email,
    password, // 🔐 For now, store raw (later hash it)
    name,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(usersRef, user);

  // Save session
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
  return id;
};
