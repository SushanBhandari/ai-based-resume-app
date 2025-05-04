import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import { createResume } from '../utils/resumeService';

export default function StepFive() {
  const { resumeData, setResumeData, setStep } = useResume();
  const { user } = useAuth();
  const router = useRouter();

  const [skill, setSkill] = useState('');
  const [skillsList, setSkillsList] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (resumeData.skillsList) {
      setSkillsList(resumeData.skillsList);
    }
  }, []);

  const handleAddSkill = () => {
    if (skill.trim() === '') {
      Alert.alert('Please enter a skill.');
      return;
    }
    setSkillsList((prev) => [...prev, skill.trim()]);
    setSkill('');
  };

  const handleGenerateAI = () => {
    Alert.alert(
      'AI Skills',
      'This would fetch skill suggestions from an AI API like Gemini or Cohere.'
    );
  };

  const handleBack = () => {
    setStep(4);
  };

  const handleFinish = async () => {
    if (!user || !user.id) {
      Alert.alert('Not logged in', 'Please log in to save your resume.');
      return;
    }

    setSaving(true);
    setResumeData((prev) => ({ ...prev, skillsList }));

    const fullResume = {
      ...resumeData,
      skillsList,
      skills: skillsList,
      name: resumeData.fullName,
      job: resumeData.jobTitle,
    };

    try {
      await createResume({
        ...resumeData,
        skillsList,
        name: resumeData.fullName,
        job: resumeData.jobTitle,
        userId: user.id,
      });
      Alert.alert('Success', 'Your resume has been saved!');
      router.push('/resume/preview');
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to save resume.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View className="mt-6 space-y-4 px-4">
      <Text className="text-2xl font-bold">Skills</Text>

      <TextInput
        placeholder="e.g. JavaScript, Communication"
        className="rounded border border-gray-300 p-3"
        value={skill}
        onChangeText={setSkill}
      />

      <TouchableOpacity onPress={handleAddSkill} className="rounded bg-green-500 px-4 py-3">
        <Text className="text-center font-semibold text-white">Add Skill</Text>
      </TouchableOpacity>

      <TouchableOpacity className="rounded bg-indigo-500 px-4 py-3" onPress={handleGenerateAI}>
        <Text className="text-center font-semibold text-white">Generate Skills with AI</Text>
      </TouchableOpacity>

      {skillsList.length > 0 && (
        <View className="mt-4">
          <Text className="mb-2 text-lg font-bold">Your Skills</Text>
          <FlatList
            data={skillsList}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View className="mb-2 rounded border bg-gray-100 px-3 py-2">
                <Text className="text-gray-800">{item}</Text>
              </View>
            )}
          />
        </View>
      )}

      <View className="flex-row justify-between pt-4">
        <TouchableOpacity onPress={handleBack} className="w-[48%] rounded bg-gray-400 px-4 py-3">
          <Text className="text-center font-semibold text-white">Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleFinish}
          className="w-[48%] rounded bg-indigo-600 px-4 py-3"
          disabled={saving}>
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-center font-semibold text-white">Finish</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
