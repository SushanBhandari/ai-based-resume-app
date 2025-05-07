import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import { ResumeData, useResume } from '../context/ResumeContext';
import { generateCohereSummary } from '../utils/cohere';
import PreviewCard from './PreviewCard';
import { Resume } from 'utils/resumeService';

export default function StepThree() {
  const { resumeData, setResumeData, setStep } = useResume();
  const [experience, setExperience] = useState({
    jobTitle: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const experienceList = resumeData.experienceList || [];

  const handleChange = (key: string, value: string) => {
    setExperience((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddExperience = () => {
    if (!experience.jobTitle || !experience.company) {
      Alert.alert('Please fill at least Job Title and Company');
      return;
    }
    const updated = [...experienceList, experience];
    setResumeData((prev: ResumeData) => ({ ...prev, experienceList: updated }));
    setExperience({ jobTitle: '', company: '', startDate: '', endDate: '', description: '' });
  };

  const handleDeleteExperience = (index: number) => {
    const updated = experienceList.filter((_: any, idx: number) => idx !== index);
    setResumeData((prev: ResumeData) => ({ ...prev, experienceList: updated }));
  };

  const handleNext = () => setStep(4);
  const handleBack = () => setStep(2);

  const handleGenerateAI = async () => {
    if (!experience.jobTitle || !experience.company) {
      Alert.alert('Please fill Job Title and Company first.');
      return;
    }
    const prompt = `Write 2-3 concise, professional bullet points for a ${experience.jobTitle} at ${experience.company}.`;
    const description = await generateCohereSummary(prompt);
    setExperience((prev) => ({ ...prev, description }));
  };

  return (
    <KeyboardAwareScrollView
      className="space-y-4 px-4 pb-24 pt-6"
      keyboardShouldPersistTaps="handled">
      <Text className="text-2xl font-bold">Experience</Text>

      <TextInput
        className="rounded border p-3"
        placeholder="Job Title"
        value={experience.jobTitle}
        onChangeText={(text) => handleChange('jobTitle', text)}
      />
      <TextInput
        className="rounded border p-3"
        placeholder="Company"
        value={experience.company}
        onChangeText={(text) => handleChange('company', text)}
      />
      <TextInput
        className="rounded border p-3"
        placeholder="Start Date"
        value={experience.startDate}
        onChangeText={(text) => handleChange('startDate', text)}
      />
      <TextInput
        className="rounded border p-3"
        placeholder="End Date"
        value={experience.endDate}
        onChangeText={(text) => handleChange('endDate', text)}
      />
      <TextInput
        className="h-32 rounded border p-3"
        placeholder="Description"
        multiline
        value={experience.description}
        onChangeText={(text) => handleChange('description', text)}
      />

      <TouchableOpacity className="rounded bg-indigo-500 px-4 py-2" onPress={handleGenerateAI}>
        <Text className="text-center font-semibold text-white">Generate Description with AI</Text>
      </TouchableOpacity>

      <Button title="Add Experience" onPress={handleAddExperience} />

      {experienceList.length > 0 && (
        <View className="mt-4">
          <Text className="mb-2 text-lg font-bold">Your Experience</Text>
          {experienceList.map((item: any, index: number) => (
            <View key={index} className="relative mb-2 rounded border bg-gray-100 p-3">
              <TouchableOpacity
                onPress={() => handleDeleteExperience(index)}
                className="absolute right-2 top-2 z-10">
                <Ionicons name="trash-outline" size={20} color="red" />
              </TouchableOpacity>
              <Text className="font-semibold">
                {item.jobTitle} at {item.company}
              </Text>
              <Text className="text-sm text-gray-600">
                {item.startDate} - {item.endDate}
              </Text>
              <Text className="text-sm text-gray-600">{item.description}</Text>
            </View>
          ))}
        </View>
      )}
      <View className="flex-row justify-between pt-4">
        <Button title="Back" onPress={handleBack} />
        <Button title="Next" onPress={handleNext} />
      </View>

      <View className="mt-8 border-t border-gray-300 pt-6">
        <Text className="mb-2 text-center text-xl font-semibold text-gray-700">Live Preview</Text>
        <PreviewCard />
      </View>
    </KeyboardAwareScrollView>
  );
}
