import React from 'react';
import { View, Text } from 'react-native';

export default function LandingCard({
  title,
  desc,
  icon,
  small = false,
}: {
  title: string;
  desc?: string;
  icon?: string;
  small?: boolean;
}) {
  return (
    <View className={`${small ? 'w-[48%] p-4' : 'p-6'} mb-4 rounded-xl bg-indigo-100`}>
      {icon && <Text className="mb-2 text-center text-3xl">{icon}</Text>}
      <Text className="text-center text-lg font-semibold">{title}</Text>
      {desc && <Text className="mt-2 text-center text-gray-600">{desc}</Text>}
    </View>
  );
}
