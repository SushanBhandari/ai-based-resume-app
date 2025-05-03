import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useResume } from '../context/ResumeContext';

export default function StepThree() {
  const { resumeData, setResumeData, setStep } = useResume();

  const [experience, setExperience] = useState({
    jobTitle: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const [experienceList, setExperienceList] = useState<any[]>([]);

  useEffect(() => {
    if (resumeData.experienceList) {
      setExperienceList(resumeData.experienceList);
    }
  }, []);

  const handleChange = (key: string, value: string) => {
    setExperience((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddExperience = () => {
    if (!experience.jobTitle || !experience.company) {
      Alert.alert('Please fill at least Job Title and Company');
      return;
    }
    const updated = [...experienceList, experience];
    setExperienceList(updated);
    setExperience({
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };

  const handleGenerateAI = () => {
    Alert.alert('AI Description', 'This would call Cohere or Gemini API.');
    // Later: use AI API to update experience.description
  };

  const handleNext = () => {
    setResumeData((prev: any) => ({ ...prev, experienceList }));
    setStep(4);
  };

  const handleBack = () => {
    setStep(2);
  };

  return (
    <View className="mt-6 space-y-4 px-4">
      <Text className="text-2xl font-bold">Experience</Text>

      <TextInput
        placeholder="Job Title"
        className="rounded border p-3"
        value={experience.jobTitle}
        onChangeText={(text) => handleChange('jobTitle', text)}
      />
      <TextInput
        placeholder="Company Name"
        className="rounded border p-3"
        value={experience.company}
        onChangeText={(text) => handleChange('company', text)}
      />
      <TextInput
        placeholder="Start Date"
        className="rounded border p-3"
        value={experience.startDate}
        onChangeText={(text) => handleChange('startDate', text)}
      />
      <TextInput
        placeholder="End Date"
        className="rounded border p-3"
        value={experience.endDate}
        onChangeText={(text) => handleChange('endDate', text)}
      />
      <TextInput
        placeholder="Description"
        className="h-32 rounded border p-3 text-start"
        value={experience.description}
        multiline
        onChangeText={(text) => handleChange('description', text)}
      />

      <TouchableOpacity className="rounded bg-indigo-500 px-4 py-2" onPress={handleGenerateAI}>
        <Text className="text-center font-semibold text-white">Generate Description with AI</Text>
      </TouchableOpacity>

      <Button title="Add Experience" onPress={handleAddExperience} />

      {/* Experience List */}
      {experienceList.length > 0 && (
        <View className="mt-4">
          <Text className="mb-2 text-lg font-bold">Your Experience</Text>
          <FlatList
            data={experienceList}
            keyExtractor={(_, idx) => idx.toString()}
            renderItem={({ item }) => (
              <View className="mb-2 rounded border bg-gray-100 p-3">
                <Text className="font-semibold">
                  {item.jobTitle} at {item.company}
                </Text>
                <Text className="text-sm text-gray-600">
                  {item.startDate} - {item.endDate}
                </Text>
                <Text className="text-sm text-gray-600">{item.description}</Text>
              </View>
            )}
          />
        </View>
      )}

      <View className="flex-row justify-between pt-4">
        <Button title="Back" onPress={handleBack} />
        <Button title="Next" onPress={handleNext} />
      </View>
    </View>
  );
}
