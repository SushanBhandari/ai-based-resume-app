import React from 'react';
import { View, Text } from 'react-native';
import { ResumeData } from '../../context/ResumeContext';

export default function ModernTemplate({ resume }: { resume: ResumeData }) {
  const color = resume.themeColor || '#6366F1';

  return (
    <View className="flex-row overflow-hidden rounded bg-white shadow">
      {/* Sidebar */}
      <View className="w-1/3 bg-gray-100 p-4" style={{ backgroundColor: color }}>
        <Text className="text-2xl font-bold text-white">{resume.fullName}</Text>
        <Text className="text-lg text-white">{resume.jobTitle}</Text>
        <Text className="mt-2 text-white">{resume.email}</Text>
        <Text className="text-white">{resume.phone}</Text>
        <Text className="text-white">{resume.address}</Text>
        <View className="mt-4">
          <Text className="font-bold text-white">Skills</Text>
          <Text className="text-white">{resume.skillsList.join(', ')}</Text>
        </View>
      </View>

      {/* Main content */}
      <View className="w-2/3 space-y-4 p-4">
        {resume.summary && (
          <View>
            <Text className="text-xl font-semibold" style={{ color }}>
              Summary
            </Text>
            <Text>{resume.summary}</Text>
          </View>
        )}

        {resume.experienceList?.length > 0 && (
          <View>
            <Text className="text-xl font-semibold" style={{ color }}>
              Experience
            </Text>
            {resume.experienceList.map((exp, i) => (
              <View key={i} className="mt-1">
                <Text className="font-semibold">
                  {exp.jobTitle} at {exp.company}
                </Text>
                <Text className="text-sm text-gray-600">
                  {exp.startDate} - {exp.endDate}
                </Text>
                <Text>{exp.description}</Text>
              </View>
            ))}
          </View>
        )}

        {resume.educationList?.length > 0 && (
          <View>
            <Text className="text-xl font-semibold" style={{ color }}>
              Education
            </Text>
            {resume.educationList.map((edu, i) => (
              <View key={i} className="mt-1">
                <Text className="font-semibold">{edu.degree}</Text>
                <Text className="text-sm">
                  {edu.institution} ({edu.year})
                </Text>
                <Text>{edu.description}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
