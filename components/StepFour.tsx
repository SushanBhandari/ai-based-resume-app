import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
import { useResume } from '../context/ResumeContext';

export default function StepFour() {
  const { resumeData, setResumeData, setStep } = useResume();

  const [education, setEducation] = useState({
    degree: '',
    institution: '',
    year: '',
    description: '',
  });

  const educationList = resumeData.educationList || [];

  const handleChange = (field: string, value: string) => {
    setEducation((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = () => {
    if (!education.degree || !education.institution) {
      Alert.alert('Degree and Institution are required');
      return;
    }
    const updated = [...educationList, education];
    setResumeData((prev) => ({ ...prev, educationList: updated }));
    setEducation({ degree: '', institution: '', year: '', description: '' });
  };

  const handleNext = () => {
    setStep(5);
  };

  const handleBack = () => {
    setStep(3);
  };

  return (
    <View className="mt-6 space-y-4 px-4">
      <Text className="text-2xl font-bold">Education</Text>

      <TextInput
        placeholder="Degree"
        className="rounded border p-3"
        value={education.degree}
        onChangeText={(text) => handleChange('degree', text)}
      />
      <TextInput
        placeholder="Institution"
        className="rounded border p-3"
        value={education.institution}
        onChangeText={(text) => handleChange('institution', text)}
      />
      <TextInput
        placeholder="Year"
        className="rounded border p-3"
        value={education.year}
        onChangeText={(text) => handleChange('year', text)}
      />
      <TextInput
        placeholder="Description (optional)"
        className="h-24 rounded border p-3 text-start"
        multiline
        value={education.description}
        onChangeText={(text) => handleChange('description', text)}
      />

      <Button title="Add Education" onPress={handleAdd} />

      {educationList.length > 0 && (
        <View className="mt-4">
          <Text className="mb-2 text-lg font-bold">Your Education</Text>
          <FlatList
            data={educationList}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View className="mb-2 rounded border bg-gray-100 p-3">
                <Text className="font-semibold">{item.degree}</Text>
                <Text className="text-sm text-gray-600">
                  {item.institution} ({item.year})
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
