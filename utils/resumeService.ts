import AsyncStorage from '@react-native-async-storage/async-storage';
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
} from 'firebase/firestore';
import { ResumeData } from '../context/ResumeContext';

export interface Resume {
  resumeId?: string;
  userId?: string;
  name?: string;
  job?: string;
  summary?: string;
  skills?: string[];
  experiences?: any[];
  education?: any[];
  themeColor?: string;
  template?: string;
  email?: string;
  phone?: string;
  address?: string;
  createdAt?: any;
  [key: string]: any;
}

export const mapToResumeData = (resume: Resume): ResumeData => ({
  fullName: resume.name || '',
  jobTitle: resume.job || '',
  email: resume.email || '',
  phone: resume.phone || '',
  address: resume.address || '',
  summary: resume.summary || '',
  experienceList: resume.experiences || [],
  educationList: resume.education || [],
  skillsList: resume.skills || [],
  themeColor: resume.themeColor || '#4F46E5',
  template: ['classic', 'modern', 'minimal'].includes(resume.template || '')
    ? (resume.template as 'classic' | 'modern' | 'minimal')
    : 'classic',
  resumeId: resume.id || '',
});

export const createResume = async (resume: Resume) => {
  const userId = await AsyncStorage.getItem('userId');
  if (!userId) throw new Error('User not logged in');

  const cleanResume = { ...resume, userId, createdAt: serverTimestamp() };

  delete cleanResume.resumeId;

  const docRef = await addDoc(collection(db, 'resumes'), cleanResume);
  return docRef.id;
};

export const getResumesByUser = async (userId: string): Promise<Resume[]> => {
  try {
    console.log('[ResumeService] Fetching for user:', userId);

    const resumesRef = collection(db, 'resumes');
    const q = query(resumesRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));

    const snapshot = await getDocs(q);
    console.log('[ResumeService] Found docs:', snapshot.docs.length);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Resume[];
  } catch (error: any) {
    console.error('[ResumeService] Firestore error:', error);
    throw new Error('Failed to fetch resumes from Firestore');
  }
};

export const getLatestResumeByUser = async (userId: string): Promise<Resume | null> => {
  const resumes = await getResumesByUser(userId);
  return resumes.length > 0 ? resumes[0] : null;
};

export const updateResume = async (resumeId: string, updates: Partial<Resume>): Promise<void> => {
  const ref = doc(db, 'resumes', resumeId);
  await updateDoc(ref, updates);
};

export const deleteResume = async (resumeId: string): Promise<void> => {
  const ref = doc(db, 'resumes', resumeId);
  await deleteDoc(ref);
};
