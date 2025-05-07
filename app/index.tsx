import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import LoginModal from '../components/LoginModal';
import LandingCard from '../components/LandingCard';
import { getResumesByUser } from '../utils/resumeService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const handleStart = async () => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        setShowLogin(true);
        return;
      }

      const resumes = await getResumesByUser(userId);
      if (resumes.length > 0) {
        router.push('/resume/dashboard');
      } else {
        router.push('/resume/create');
      }
    } catch (err) {
      Alert.alert('Error', 'Something went wrong while checking resumes.');
    }
  };

  return (
    <>
      <ScrollView className="flex-1 bg-white">
        {/* Hero Section */}
        <View className="rounded-b-3xl bg-indigo-500 px-6 py-12">
          <Text className="mb-3 text-3xl font-bold text-white">
            Build Stunning Resumes Instantly with <Text className="text-yellow-300">AI</Text>
          </Text>
          <Text className="mb-6 text-lg text-white">
            Generate, customize, and share professional resumes powered by AI.
          </Text>
          <TouchableOpacity
            onPress={handleStart}
            className="self-start rounded-lg bg-yellow-400 px-6 py-4">
            <Text className="text-lg font-semibold text-black">Get Started</Text>
          </TouchableOpacity>
          <Image
            source={require('../assets/landing-resume-preview.png')}
            className="mt-6 h-64 w-full rounded-xl"
            resizeMode="contain"
          />
        </View>

        {/* How It Works */}
        <View className="px-4 py-10">
          <Text className="mb-6 text-center text-2xl font-bold">How It Works</Text>
          <View className="space-y-4">
            <LandingCard
              title="1. Input Details"
              desc="Fill in your info or import from LinkedIn."
            />
            <LandingCard
              title="2. Generate Resume"
              desc="AI crafts a resume tailored to your profile."
            />
            <LandingCard title="3. Customize & Share" desc="Edit, download or share instantly." />
          </View>
        </View>

        {/* Features */}
        <View className="px-4 py-10">
          <Text className="mb-6 text-center text-2xl font-bold">Powerful Features</Text>
          <View className="flex-row flex-wrap justify-between">
            <LandingCard icon="🤖" title="AI Powered Writing" small />
            <LandingCard icon="🎨" title="Easy Customization" small />
            <LandingCard icon="🔗" title="LinkedIn Import" small />
            <LandingCard icon="📤" title="1-Click Share" small />
          </View>
        </View>

        {/* CTA */}
        <View className="rounded-t-3xl bg-indigo-600 p-6">
          <Text className="mb-2 text-center text-2xl font-bold text-white">
            Ready to Create Your Resume?
          </Text>
          <Text className="mb-6 text-center text-white">
            Start building your resume in under 2 minutes. It's free.
          </Text>
          <TouchableOpacity
            onPress={handleStart}
            className="mx-auto rounded-lg bg-yellow-400 px-6 py-4">
            <Text className="text-lg font-semibold text-black">Create My Resume</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text className="py-6 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} ResumeGen AI. All rights reserved.
        </Text>
      </ScrollView>

      <LoginModal visible={showLogin} onClose={() => setShowLogin(false)} onSuccess={handleStart} />
    </>
  );
}
