// app/_layout.tsx
import { Stack } from 'expo-router';
import { ResumeProvider } from '../context/ResumeContext';
import { AuthProvider } from '../context/AuthContext';
import '../global.css';

export default function RootLayout() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <Stack />
      </ResumeProvider>
    </AuthProvider>
  );
}
