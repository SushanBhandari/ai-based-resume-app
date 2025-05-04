import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { useResume } from '../context/ResumeContext';

export default function StepTwo() {
  const { resumeData, setResumeData, setStep } = useResume();

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

  const handleGenerateAI = () => {
    Alert.alert('AI Summary', 'This would generate summary using Gemini or Cohere.');
  };

  return (
    <View className="mt-6 space-y-4 px-4">
      <Text className="text-2xl font-bold">Professional Summary</Text>

      <TextInput
        className="h-40 rounded border p-3 text-start"
        multiline
        placeholder="Write a brief summary about your professional background..."
        value={resumeData.summary}
        onChangeText={(text) => setResumeData((prev) => ({ ...prev, summary: text }))}
      />

      <TouchableOpacity className="rounded bg-indigo-500 px-4 py-2" onPress={handleGenerateAI}>
        <Text className="text-center font-semibold text-white">Generate with AI</Text>
      </TouchableOpacity>

      <View className="flex-row justify-between pt-4">
        <Button title="Back" onPress={handleBack} />
        <Button title="Next" onPress={handleNext} />
      </View>
    </View>
  );
}
