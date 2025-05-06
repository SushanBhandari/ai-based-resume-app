import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Experience {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  description: string;
}

export interface ResumeData {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  experienceList: Experience[];
  educationList: Education[];
  skillsList: string[];
  themeColor?: string;
  template?: 'classic' | 'modern' | 'minimal';
}

interface ResumeContextType {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const defaultResumeData: ResumeData = {
  fullName: '',
  jobTitle: '',
  email: '',
  phone: '',
  address: '',
  summary: '',
  experienceList: [],
  educationList: [],
  skillsList: [],
  template: 'classic',
  themeColor: '#4F46E5',
};

const ResumeContext = createContext<any>(null);

export const ResumeProvider = ({ children }: { children: React.ReactNode }) => {
  const [step, setStep] = useState(1);
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);

  // ✅ Load resume from storage
  useEffect(() => {
    const load = async () => {
      const saved = await AsyncStorage.getItem('resumeData');
      if (saved) setResumeData(JSON.parse(saved));
    };
    load();
  }, []);

  // ✅ Save resume to storage on every change
  useEffect(() => {
    AsyncStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  return (
    <ResumeContext.Provider value={{ step, setStep, resumeData, setResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) throw new Error('useResume must be used within ResumeProvider');
  return context;
};
