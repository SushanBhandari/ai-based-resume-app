import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { ResumeData, useResume } from '../context/ResumeContext';
import { Ionicons } from '@expo/vector-icons';
import PreviewCard from './PreviewCard';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function StepFour() {
  const { resumeData, setResumeData, setStep } = useResume();
  const [educationList, setEducationList] = useState(resumeData.educationList || []);
  const [education, setEducation] = useState({
    degree: '',
    institution: '',
    year: '',
    description: '',
  });

  useEffect(() => {
    setEducationList(resumeData.educationList || []);
  }, []);

  const handleChange = (field: string, value: string) => {
    setEducation((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = () => {
    if (!education.degree || !education.institution) {
      Alert.alert('Degree and Institution are required');
      return;
    }
    const updated = [...educationList, education];
    setEducationList(updated);
    setResumeData((prev: ResumeData) => ({
      ...prev,
      educationList: updated,
    }));
    setEducation({ degree: '', institution: '', year: '', description: '' });
  };

  const handleDeleteEducation = (index: number) => {
    const updated = educationList.filter((_: any, idx: number) => idx !== index);
    setResumeData((prev: ResumeData) => ({
      ...prev,
      educationList: updated,
    }));
  };

  const handleNext = () => setStep(5);
  const handleBack = () => setStep(3);

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={100}
      className="space-y-4 px-4 pb-24 pt-6">
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
          {educationList.map((item: any, index: number) => (
            <View key={index} className="relative mb-2 rounded border bg-gray-100 p-3">
              <Text className="font-semibold">{item.degree}</Text>
              <Text className="text-sm text-gray-600">
                {item.institution} ({item.year})
              </Text>
              <Text className="text-sm text-gray-600">{item.description}</Text>
              <TouchableOpacity
                onPress={() => handleDeleteEducation(index)}
                className="absolute right-2 top-2">
                <Ionicons name="trash-outline" size={20} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

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
