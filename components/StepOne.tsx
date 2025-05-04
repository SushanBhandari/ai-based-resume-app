import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useResume } from '../context/ResumeContext';
import PreviewCard from './PreviewCard'; // adjust path if needed

export default function StepOne() {
  const { resumeData, setResumeData, setStep } = useResume();

  const [form, setForm] = useState({
    fullName: '',
    jobTitle: '',
    address: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    setForm((prev) => ({ ...prev, ...resumeData }));
  }, [resumeData]);

  const handleChange = (field: string, value: string) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    setResumeData((prev) => ({ ...prev, ...updated }));
  };

  const handleNext = () => {
    setStep(2);
  };

  return (
    <ScrollView className="mt-6 space-y-4 px-4 pb-12">
      <Text className="text-2xl font-bold">Personal Information</Text>

      <TextInput
        className="rounded border border-gray-400 p-3"
        placeholder="Full Name"
        value={form.fullName}
        onChangeText={(text) => handleChange('fullName', text)}
      />
      <TextInput
        className="rounded border border-gray-400 p-3"
        placeholder="Job Title"
        value={form.jobTitle}
        onChangeText={(text) => handleChange('jobTitle', text)}
      />
      <TextInput
        className="rounded border border-gray-400 p-3"
        placeholder="Address"
        value={form.address}
        onChangeText={(text) => handleChange('address', text)}
      />
      <TextInput
        className="rounded border border-gray-400 p-3"
        placeholder="Phone"
        keyboardType="phone-pad"
        value={form.phone}
        onChangeText={(text) => handleChange('phone', text)}
      />
      <TextInput
        className="rounded border border-gray-400 p-3"
        placeholder="Email"
        keyboardType="email-address"
        value={form.email}
        onChangeText={(text) => handleChange('email', text)}
      />

      <TouchableOpacity onPress={handleNext} className="mt-4 rounded bg-yellow-400 px-6 py-3">
        <Text className="text-center text-lg font-semibold text-black">Next</Text>
      </TouchableOpacity>

      {/* 👇 Live Preview Resume */}
      <View className="mt-6 border-t border-gray-300 pt-6">
        <Text className="mb-2 text-center text-xl font-semibold text-gray-700">Live Preview</Text>
        <PreviewCard />
      </View>
    </ScrollView>
  );
}
