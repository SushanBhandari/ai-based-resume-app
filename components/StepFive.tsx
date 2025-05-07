// components/StepFive.tsx
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
import { createResume, updateResume } from '../utils/resumeService';
import PreviewCard from './PreviewCard';

export default function StepFive() {
  const { resumeData, setResumeData, setStep } = useResume();
  const { user } = useAuth();
  const router = useRouter();

  const [skill, setSkill] = useState('');
  const [skillsList, setSkillsList] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setSkillsList(resumeData.skillsList || []);
  }, [resumeData.skillsList]);

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
        userId: user.id,
      };

      console.log('resumeId on save:', resumeData.resumeId);

      if (resumeData.resumeId) {
        console.log('[StepFive] Updating existing resume:', resumeData.resumeId);
        await updateResume(resumeData.resumeId, fullResume);
        Alert.alert('Resume Updated', 'Your resume was successfully updated.');
      } else {
        console.log('[StepFive] Creating new resume...');
        await createResume(fullResume);
        Alert.alert('Resume Created', 'Your new resume was saved.');
      }

      router.push('/resume/preview');
    } catch (error: any) {
      console.error('[StepFive] Error saving resume:', error);
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
            <Text className="text-center font-semibold text-white">
              {resumeData.resumeId ? 'Update' : 'Finish'}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View className="mt-6 border-t border-gray-300 pt-6">
        <Text className="mb-2 text-center text-xl font-semibold text-gray-700">Live Preview</Text>
        <PreviewCard />
      </View>
    </View>
  );
}
