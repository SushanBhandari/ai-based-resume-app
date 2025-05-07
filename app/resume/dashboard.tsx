// app/resume/dashboard.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useResume } from '../../context/ResumeContext';
import { Resume, getResumesByUser, deleteResume, mapToResumeData } from '../../utils/resumeService';
import { downloadResumePDF } from '../../utils/resumeExport';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dashboard() {
  const router = useRouter();
  const { setResumeData } = useResume();
  const [resumes, setResumes] = useState<Resume[]>([]);

  useEffect(() => {
    const loadResumes = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          const data = await getResumesByUser(userId);
          setResumes(data);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load resumes');
      }
    };

    loadResumes();
  }, []);

  const handlePreview = (resume: Resume) => {
    setResumeData(mapToResumeData(resume));
    router.push('/resume/preview');
  };

  const handleEdit = (resume: Resume) => {
    const mapped = mapToResumeData(resume);
    console.log('[Dashboard] Editing resume with ID:', mapped.resumeId);
    setResumeData(mapped);
    router.push('/resume/create');
  };

  const handleCreateNew = () => {
    setResumeData({
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      address: '',
      summary: '',
      experienceList: [],
      educationList: [],
      skillsList: [],
      themeColor: '#4F46E5',
      template: 'classic',
      resumeId: undefined,
    });
    router.push('/resume/create');
  };

  const handleDownload = async (resume: Resume) => {
    try {
      await downloadResumePDF(mapToResumeData(resume));
    } catch (err: any) {
      Alert.alert('Download failed', err.message);
    }
  };

  const handleDelete = async (resumeId: string) => {
    try {
      await deleteResume(resumeId);
      setResumes((prev) => prev.filter((r) => r.id !== resumeId));
    } catch {
      Alert.alert('Failed to delete resume');
    }
  };

  return (
    <View className="p-4">
      <Text className="mb-4 text-2xl font-bold">Your Resumes</Text>

      <TouchableOpacity onPress={handleCreateNew} className="mb-4 rounded bg-indigo-600 px-4 py-3">
        <Text className="text-center font-semibold text-white">+ Create New Resume</Text>
      </TouchableOpacity>

      <FlatList
        data={resumes}
        keyExtractor={(item) => item.id || ''}
        renderItem={({ item }) => (
          <View className="mb-4 rounded border p-3">
            <Text className="text-lg font-semibold">{item.name || 'Untitled'}</Text>
            <Text className="text-sm text-gray-600">{item.job}</Text>
            <View className="mt-2 flex-row justify-between">
              <TouchableOpacity onPress={() => handlePreview(item)}>
                <Text className="text-blue-500">Preview</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Text className="text-yellow-600">Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDownload(item)}>
                <Text className="text-green-500">Download</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id!)}>
                <Text className="text-red-500">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
