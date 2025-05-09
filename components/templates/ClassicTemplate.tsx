import React from 'react';
import { View, Text } from 'react-native';
import { ResumeData } from '../../context/ResumeContext';

export default function ClassicTemplate({ resume }: { resume: ResumeData }) {
  const color = resume.themeColor || '#1F2937';

  return (
    <View className="space-y-5 rounded border bg-white p-4">
      <Text className="font-serif text-3xl font-bold" style={{ color }}>
        {resume.fullName}
      </Text>
      <Text className="font-serif text-lg italic text-gray-700">{resume.jobTitle}</Text>
      <Text className="text-gray-600">
        {resume.email} | {resume.phone}
      </Text>
      <Text className="text-gray-600">{resume.address}</Text>

      {resume.summary && (
        <View>
          <Text
            className="mt-4 border-b pb-1 font-bold uppercase text-gray-800"
            style={{ borderColor: color }}>
            Summary
          </Text>
          <Text>{resume.summary}</Text>
        </View>
      )}

      {resume.experienceList?.length > 0 && (
        <View>
          <Text
            className="mt-4 border-b pb-1 font-bold uppercase text-gray-800"
            style={{ borderColor: color }}>
            Experience
          </Text>
          {resume.experienceList.map((exp, i) => (
            <View key={i} className="mt-2">
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
          <Text
            className="mt-4 border-b pb-1 font-bold uppercase text-gray-800"
            style={{ borderColor: color }}>
            Education
          </Text>
          {resume.educationList.map((edu, i) => (
            <View key={i} className="mt-2">
              <Text className="font-semibold">{edu.degree}</Text>
              <Text className="text-sm">
                {edu.institution} ({edu.year})
              </Text>
              <Text>{edu.description}</Text>
            </View>
          ))}
        </View>
      )}

      {resume.skillsList?.length > 0 && (
        <View>
          <Text
            className="mt-4 border-b pb-1 font-bold uppercase text-gray-800"
            style={{ borderColor: color }}>
            Skills
          </Text>
          <Text>{resume.skillsList.join(', ')}</Text>
        </View>
      )}
    </View>
  );
}
