import { db } from '../firebase/config';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';

export interface Resume {
  id?: string;
  userId?: string;
  name?: string;
  job?: string;
  summary?: string;
  skills?: string[];
  experiences?: any[];
  education?: any[];
  themeColor?: string;
  template?: string;
  createdAt?: any;
  [key: string]: any;
}

export const createResume = async (resume: Resume, userId: string): Promise<string> => {
  const docRef = await addDoc(collection(db, 'resumes'), {
    ...resume,
    userId,
    createdAt: serverTimestamp(), // Timestamp for sorting
  });
  return docRef.id;
};

export const getResumesByUser = async (userId: string): Promise<Resume[]> => {
  const q = query(
    collection(db, 'resumes'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
    id: doc.id,
    ...doc.data(),
  })) as Resume[];
};

/**
 * Update an existing resume
 * @param resumeId Document ID
 * @param updates Partial resume data to update
 */
export const updateResume = async (resumeId: string, updates: Partial<Resume>): Promise<void> => {
  const ref = doc(db, 'resumes', resumeId);
  await updateDoc(ref, updates);
};

/**
 * Delete a resume by its ID
 * @param resumeId Document ID
 */
export const deleteResume = async (resumeId: string): Promise<void> => {
  const ref = doc(db, 'resumes', resumeId);
  await deleteDoc(ref);
};
