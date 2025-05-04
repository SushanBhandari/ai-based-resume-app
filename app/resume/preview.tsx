import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import PreviewCard from '../../components/PreviewCard';

export default function ResumePreviewScreen() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="mb-4 text-2xl font-bold">Your Resume</Text>
      <PreviewCard />
    </ScrollView>
  );
}
