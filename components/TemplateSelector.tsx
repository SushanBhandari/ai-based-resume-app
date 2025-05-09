import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ResumeData, useResume } from '../context/ResumeContext';

const templates = ['classic', 'modern', 'compact'];

export default function TemplateSelector() {
  const { resumeData, setResumeData } = useResume();

  return (
    <View className="my-4 space-y-3">
      <Text className="text-lg font-bold">Choose Resume Template</Text>
      <View className="flex-row justify-between">
        {templates.map((tpl) => (
          <TouchableOpacity
            key={tpl}
            className={`rounded border px-4 py-3 ${
              resumeData.template === tpl ? 'border-indigo-500 bg-indigo-100' : 'border-gray-300'
            }`}
            onPress={() =>
              setResumeData((prev: ResumeData) => ({ ...prev, template: tpl as any }))
            }>
            <Text className="text-center capitalize">{tpl}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
