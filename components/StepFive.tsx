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
import { ResumeData, useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import { createResume } from '../utils/resumeService';

export default function StepFive() {
  const { resumeData, setResumeData, setStep } = useResume();
  const { user } = useAuth();
  const router = useRouter();

  const [skill, setSkill] = useState('');
  const [skillsList, setSkillsList] = useState<string[]>(resumeData.skillsList || []);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setSkillsList(resumeData.skillsList || []);
  }, []);

  const handleAddSkill = () => {
    if (skill.trim() === '') {
      Alert.alert('Please enter a skill.');
      return;
    }
    const updatedSkills = [...skillsList, skill.trim()];
    setSkillsList(updatedSkills);
    setResumeData((prev: ResumeData) => ({ ...prev, skillsList: updatedSkills }));
    setSkill('');
  };

  const handleBack = () => {
    setStep(4);
  };

  const handleFinish = async () => {
    if (!user || !user.id) {
      Alert.alert('Authentication required', 'Please log in to save your resume.');
      return;
    }

    setSaving(true);

    try {
      const fullResume = {
        ...resumeData,
        skillsList,
        skills: skillsList,
        name: resumeData.fullName,
        job: resumeData.jobTitle,
        userId: user.id, // ✅ ensure this is saved
      };

      await createResume(fullResume);

      Alert.alert('Success', 'Resume saved successfully!');
      router.push('/resume/preview');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to save resume.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View className="mt-6 space-y-4 px-4 pb-16">
      <Text className="text-2xl font-bold">Skills</Text>

      <TextInput
        placeholder="e.g. JavaScript, Leadership"
        className="rounded border border-gray-300 p-3"
        value={skill}
        onChangeText={setSkill}
      />

      <TouchableOpacity onPress={handleAddSkill} className="rounded bg-green-500 px-4 py-3">
        <Text className="text-center font-semibold text-white">Add Skill</Text>
      </TouchableOpacity>

      {skillsList.length > 0 && (
        <View>
          <Text className="mb-2 text-lg font-bold">Your Skills</Text>
          <FlatList
            data={skillsList}
            keyExtractor={(_, idx) => idx.toString()}
            renderItem={({ item }) => (
              <View className="mb-2 rounded border bg-gray-100 px-3 py-2">
                <Text className="text-gray-800">{item}</Text>
              </View>
            )}
          />
        </View>
      )}

      <View className="flex-row justify-between pt-6">
        <TouchableOpacity onPress={handleBack} className="w-[48%] rounded bg-gray-500 px-4 py-3">
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
