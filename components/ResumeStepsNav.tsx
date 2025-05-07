import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useResume } from '../context/ResumeContext';

const steps = [1, 2, 3, 4, 5];

export default function ResumeStepsNav() {
  const { step, setStep } = useResume();

  return (
    <View className="mt-4 flex-row items-center justify-center space-x-2">
      {steps.map((s) => (
        <TouchableOpacity
          key={s}
          onPress={() => setStep(s)}
          className={`rounded-full px-4 py-2 ${step === s ? 'bg-indigo-600' : 'bg-gray-300'}`}>
          <Text className="font-bold text-white">{s}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
