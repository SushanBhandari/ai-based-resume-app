import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useResume } from '../context/ResumeContext';
import { createResume } from '../utils/resumeService';
import { getAuth } from 'firebase/auth';

export default function StepFive() {
  const { resumeData, setResumeData, setStep } = useResume();
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
    // Later: fetch from Cohere or Gemini and setSkillsList([...skillsList, ...response]);
  };

  const handleBack = () => {
    setStep(4);
  };

  const handleFinish = async () => {
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
      const user = getAuth().currentUser;
      if (!user) {
        Alert.alert('Error', 'You must be logged in to save your resume.');
        setSaving(false);
        return;
      }

      const resumeId = await createResume(fullResume, user.uid);
      Alert.alert('Success', `Resume saved successfully!`);
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
        className="rounded border p-3"
        value={skill}
        onChangeText={setSkill}
      />

      <Button title="Add Skill" onPress={handleAddSkill} />

      <TouchableOpacity className="rounded bg-indigo-500 px-4 py-2" onPress={handleGenerateAI}>
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
        <Button title="Back" onPress={handleBack} />
        <Button title={saving ? 'Saving...' : 'Finish'} onPress={handleFinish} disabled={saving} />
      </View>
    </View>
  );
}
