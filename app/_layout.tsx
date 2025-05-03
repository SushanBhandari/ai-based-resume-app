import { Stack } from 'expo-router';
import { ResumeProvider } from '../context/ResumeContext';
import '../global.css';

export default function RootLayout() {
  return (
    <ResumeProvider>
      <Stack />
    </ResumeProvider>
  );
}
