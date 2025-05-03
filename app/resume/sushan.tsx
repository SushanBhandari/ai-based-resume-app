import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Screen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-bold">Welcome</Text>
      <Button title="Create Resume" />
    </View>
  );
}
