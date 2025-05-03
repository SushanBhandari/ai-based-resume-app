import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useResume } from '../context/ResumeContext';

export default function PreviewCard() {
  const { resumeData } = useResume();

  if (!resumeData || typeof resumeData !== 'object') {
    return (
      <View className="p-4">
        <Text className="text-center text-red-500">Resume data is not available yet.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="space-y-6 rounded-xl bg-white p-4 shadow-md">
      {/* Personal Info */}
      <View>
        <Text className="text-2xl font-bold">{resumeData.fullName || 'Full Name'}</Text>
        <Text className="text-gray-600">{resumeData.jobTitle || 'Job Title'}</Text>
        <Text className="text-gray-500">{resumeData.email || 'Email'}</Text>
        <Text className="text-gray-500">{resumeData.phone || 'Phone'}</Text>
        <Text className="text-gray-500">{resumeData.address || 'Address'}</Text>
      </View>

      {/* Summary */}
      {resumeData.summary ? (
        <View>
          <Text className="mb-2 text-xl font-bold">Summary</Text>
          <Text className="text-gray-700">{resumeData.summary}</Text>
        </View>
      ) : null}

      {/* Experience */}
      {resumeData.experienceList?.length > 0 ? (
        <View>
          <Text className="mb-2 text-xl font-bold">Experience</Text>
          {resumeData.experienceList.map((exp: any, idx: number) => (
            <View key={idx} className="mb-3">
              <Text className="font-semibold">
                {exp.jobTitle || 'Job Title'} at {exp.company || 'Company'}
              </Text>
              <Text className="text-sm text-gray-600">
                {exp.startDate || 'Start'} - {exp.endDate || 'End'}
              </Text>
              <Text className="text-gray-700">{exp.description || ''}</Text>
            </View>
          ))}
        </View>
      ) : null}

      {/* Education */}
      {resumeData.educationList?.length > 0 ? (
        <View>
          <Text className="mb-2 text-xl font-bold">Education</Text>
          {resumeData.educationList.map((edu: any, idx: number) => (
            <View key={idx} className="mb-3">
              <Text className="font-semibold">{edu.degree || 'Degree'}</Text>
              <Text className="text-sm text-gray-600">
                {edu.institution || 'Institution'} ({edu.year || 'Year'})
              </Text>
              <Text className="text-gray-700">{edu.description || ''}</Text>
            </View>
          ))}
        </View>
      ) : null}

      {/* Skills */}
      {resumeData.skillsList?.length > 0 ? (
        <View>
          <Text className="mb-2 text-xl font-bold">Skills</Text>
          <View className="flex-row flex-wrap gap-2">
            {resumeData.skillsList.map((skill: string, i: number) => (
              <Text
                key={i}
                className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-800">
                {skill}
              </Text>
            ))}
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
}
