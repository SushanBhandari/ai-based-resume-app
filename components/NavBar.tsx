import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  return (
    <View className="flex-row items-center justify-between bg-white px-4 py-3 shadow">
      {/* Logo/Home */}
      <TouchableOpacity onPress={() => router.push('/')}>
        <Image source={require('../assets/logo.svg')} className="h-8 w-8" resizeMode="contain" />
      </TouchableOpacity>

      {/* Center: Dashboard */}
      <TouchableOpacity onPress={() => router.push('/resume/dashboard')}>
        <Text className="text-lg font-semibold text-indigo-600">Dashboard</Text>
      </TouchableOpacity>

      {/* Right: Username and Logout */}
      <View className="flex-row items-center space-x-4">
        <Text className="text-sm font-medium text-gray-700">{user?.name || 'Guest'}</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text className="text-sm text-red-500">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
