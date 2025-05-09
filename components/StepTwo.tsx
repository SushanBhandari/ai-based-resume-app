import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { ResumeData, useResume } from '../context/ResumeContext';
import { generateCohereSummary } from '../utils/cohere';
import PreviewCard from './PreviewCard';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function StepTwo() {
  const { resumeData, setResumeData, setStep } = useResume();
  const [summary, setSummary] = useState('');
  const handleNext = () => {
    if (!resumeData.summary.trim()) {
      Alert.alert('Validation Error', 'Please provide a summary or generate one using AI.');
      return;
    }
    setStep(3);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleGenerateAI = async () => {
    const prompt = `Generate a professional summary for someone named ${resumeData.fullName} who works as a ${resumeData.jobTitle}. in a single paragraph about 100 words`;
    const generated = await generateCohereSummary(prompt);
    setResumeData((prev: ResumeData) => ({ ...prev, summary: generated }));
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={100}
      className="space-y-4 px-4 pb-24 pt-6">
      <Text className="text-2xl font-bold">Professional Summary</Text>

      <TextInput
        className="h-40 rounded border p-3 text-start"
        multiline
        placeholder="Write a brief summary about your professional background..."
        value={resumeData.summary}
        onChangeText={(text) => setResumeData((prev: ResumeData) => ({ ...prev, summary: text }))}
      />

      <TouchableOpacity className="rounded bg-indigo-500 px-4 py-2" onPress={handleGenerateAI}>
        <Text className="text-center font-semibold text-white">Generate with AI</Text>
      </TouchableOpacity>

      <View className="flex-row justify-between pt-4">
        <Button title="Back" onPress={handleBack} />
        <Button title="Next" onPress={handleNext} />
      </View>
      <View className="mt-6 border-t border-gray-300 pt-6">
        <Text className="mb-2 text-center text-xl font-semibold text-gray-700">Live Preview</Text>
        <PreviewCard />
      </View>
    </KeyboardAwareScrollView>
  );
}
