import React from 'react';
import { View, Text } from 'react-native';
import { ResumeData } from '../../context/ResumeContext';

export default function ClassicTemplate({ resume }: { resume: ResumeData }) {
  return (
    <View>
      <Text className="text-2xl font-bold">{resume.fullName}</Text>
      <Text className="text-lg text-gray-600">{resume.jobTitle}</Text>
      <Text className="text-gray-500">{resume.email}</Text>
      <Text className="text-gray-500">{resume.phone}</Text>
      <Text className="text-gray-500">{resume.address}</Text>

      {resume.summary && (
        <>
          <Text className="mt-4 text-xl font-bold">Summary</Text>
          <Text>{resume.summary}</Text>
        </>
      )}

      {resume.experienceList?.length > 0 && (
        <>
          <Text className="mt-4 text-xl font-bold">Experience</Text>
          {resume.experienceList.map((exp, i) => (
            <View key={i}>
              <Text className="font-semibold">
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

      {resume.educationList?.length > 0 && (
        <>
          <Text className="mt-4 text-xl font-bold">Education</Text>
          {resume.educationList.map((edu, i) => (
            <View key={i}>
              <Text className="font-semibold">{edu.degree}</Text>
              <Text className="text-sm">
                {edu.institution} ({edu.year})
              </Text>
              <Text>{edu.description}</Text>
            </View>
          ))}
        </>
      )}

      {resume.skillsList?.length > 0 && (
        <>
          <Text className="mt-4 text-xl font-bold">Skills</Text>
          <Text>{resume.skillsList.join(', ')}</Text>
        </>
      )}
    </View>
  );
}
