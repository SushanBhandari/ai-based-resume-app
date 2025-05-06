import React from 'react';
import { View, Text } from 'react-native';
import { ResumeData } from '../../context/ResumeContext';

export default function CompactTemplate({ resume }: { resume: ResumeData }) {
  return (
    <View className="space-y-1 text-sm">
      <Text className="text-lg font-bold">{resume.fullName}</Text>
      <Text>{resume.jobTitle}</Text>
      <Text>
        {resume.email}, {resume.phone}
      </Text>

      {resume.summary && <Text>📝 {resume.summary}</Text>}

      {resume.experienceList?.length > 0 && (
        <View>
          <Text className="font-bold">Experience:</Text>
          {resume.experienceList.map((e, i) => (
            <Text key={i}>
              - {e.jobTitle} @ {e.company}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}
