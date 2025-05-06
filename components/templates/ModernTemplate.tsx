import React from 'react';
import { View, Text } from 'react-native';
import { ResumeData } from '../../context/ResumeContext';

export default function ModernTemplate({ resume }: { resume: ResumeData }) {
  return (
    <View className="space-y-3 border-l-4 border-indigo-500 bg-indigo-50 p-4">
      <Text className="text-3xl font-bold text-indigo-800">{resume.fullName}</Text>
      <Text className="text-lg text-indigo-600">{resume.jobTitle}</Text>
      <Text className="text-gray-700">
        {resume.email} | {resume.phone}
      </Text>
      <Text className="text-gray-700">{resume.address}</Text>

      {resume.summary && (
        <>
          <Text className="text-xl font-semibold text-indigo-700">Summary</Text>
          <Text>{resume.summary}</Text>
        </>
      )}

      {resume.experienceList?.length > 0 && (
        <>
          <Text className="text-xl font-semibold text-indigo-700">Experience</Text>
          {resume.experienceList.map((exp, i) => (
            <View key={i}>
              <Text className="font-semibold text-indigo-800">
                {exp.jobTitle} at {exp.company}
              </Text>
              <Text className="text-sm text-gray-600">
                {exp.startDate} - {exp.endDate}
              </Text>
              <Text>{exp.description}</Text>
            </View>
          ))}
        </>
      )}
    </View>
  );
}
