import React from 'react';
import { View, Text } from 'react-native';
import { ResumeData } from '../../context/ResumeContext';

export default function MinimalTemplate({ resume }: { resume: ResumeData }) {
  const color = resume.themeColor || '#10B981'; // e.g., green

  return (
    <View className="space-y-2 p-3 text-sm">
      {/* Header */}
      <Text className="text-base font-bold" style={{ color }}>
        {resume.fullName}
      </Text>
      <Text className="text-gray-700">{resume.jobTitle}</Text>
      <Text className="text-gray-500">
        {resume.email} | {resume.phone}
      </Text>
      <Text className="text-gray-500">{resume.address}</Text>

      {/* Summary inline */}
      {resume.summary && <Text className="mt-1 text-gray-800">📝 {resume.summary}</Text>}

      {/* Experience inline list */}
      {resume.experienceList?.length > 0 && (
        <View className="mt-2 space-y-1">
          {resume.experienceList.map((exp, i) => (
            <Text key={i} className="text-gray-800">
              ✅ {exp.jobTitle} @ {exp.company} ({exp.startDate} - {exp.endDate})
            </Text>
          ))}
        </View>
      )}

      {/* Education compact list */}
      {resume.educationList?.length > 0 && (
        <View className="mt-2 space-y-1">
          {resume.educationList.map((edu, i) => (
            <Text key={i} className="text-gray-800">
              🎓 {edu.degree} - {edu.institution} ({edu.year})
            </Text>
          ))}
        </View>
      )}

      {/* Skills inline */}
      {resume.skillsList?.length > 0 && (
        <Text className="mt-2 text-gray-800">🛠 {resume.skillsList.join(', ')}</Text>
      )}
    </View>
  );
}
