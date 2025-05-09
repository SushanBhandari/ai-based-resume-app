import React from 'react';
import { View, Text } from 'react-native';
import { useResume } from '../context/ResumeContext';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import MinimalTemplate from './templates/ModernTemplate';

export default function PreviewCard() {
  const { resumeData } = useResume();

  if (!resumeData || typeof resumeData !== 'object') {
    return (
      <View className="p-4">
        <Text className="text-center text-red-500">Resume data is not available yet.</Text>
      </View>
    );
  }

  switch (resumeData.template) {
    case 'modern':
      return <ModernTemplate resume={resumeData} />;
    case 'minimal':
      return <MinimalTemplate resume={resumeData} />;
    case 'classic':
    default:
      return <ClassicTemplate resume={resumeData} />;
  }
}
