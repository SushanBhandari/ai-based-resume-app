import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useResume } from '../../context/ResumeContext';
import PreviewCard from '../../components/PreviewCard';
import { downloadResumePDF, shareResumePDF, printResume } from '../../utils/resumeExport';
import Navbar from 'components/NavBar';

export default function ResumePreviewScreen() {
  const { resumeData } = useResume();

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="mb-4 text-2xl font-bold">Your Resume</Text>
      <PreviewCard />
      <Navbar />
      <View className="mt-6 space-y-4">
        <TouchableOpacity
          className="rounded bg-green-600 p-4"
          onPress={() => downloadResumePDF(resumeData)}>
          <Text className="text-center font-semibold text-white">Download as PDF</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="rounded bg-blue-600 p-4"
          onPress={() => shareResumePDF(resumeData)}>
          <Text className="text-center font-semibold text-white">Share Resume</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="rounded bg-indigo-600 p-4"
          onPress={() => printResume(resumeData)}>
          <Text className="text-center font-semibold text-white">Print Resume</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
