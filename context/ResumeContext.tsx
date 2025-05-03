import React, { createContext, useContext, useState } from 'react';

interface Experience {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
  description: string;
}

interface ResumeData {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  experienceList: Experience[];
  educationList: Education[];
  skillsList: string[];
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
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: React.ReactNode }) => {
  const [step, setStep] = useState(1);
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);

  return (
    <ResumeContext.Provider value={{ step, setStep, resumeData, setResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (!context) throw new Error('useResume must be used within ResumeProvider');
  return context;
};
