import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useResume } from '../context/ResumeContext';
import { generateResumeHTML } from '../utils/resumeExport';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function ResumeActions() {
  const { resumeData } = useResume();

  const handleDownload = async () => {
    try {
      const html = generateResumeHTML(resumeData);
      const { uri } = await Print.printToFileAsync({ html });

      const fileName = uri.split('/').pop() ?? `resume-${Date.now()}.pdf`;
      const destPath = `${FileSystem.documentDirectory}${fileName}`;
      await FileSystem.copyAsync({ from: uri, to: destPath });

      const info = await FileSystem.getInfoAsync(destPath);
      if (!info.exists) throw new Error('File not saved.');

      Alert.alert('Download Successful', `Saved at:\n${destPath}`);
    } catch (err: any) {
      console.error('[Download Error]', err);
      Alert.alert('Download Failed', err.message || 'Error occurred');
    }
  };

  const handleShare = async () => {
    try {
      const html = generateResumeHTML(resumeData);
      const { uri } = await Print.printToFileAsync({ html });

      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert('Not Supported', 'Sharing is not available on this device.');
        return;
      }

      await Sharing.shareAsync(uri);
    } catch (err: any) {
      console.error('[Share Error]', err);
      Alert.alert('Share Failed', err.message || 'Error occurred');
    }
  };

  const handlePrint = async () => {
    try {
      const html = generateResumeHTML(resumeData);
      await Print.printAsync({ html });
    } catch (err: any) {
      console.error('[Print Error]', err);
      Alert.alert('Print Failed', err.message || 'Error occurred');
    }
  };

  return (
    <View className="mt-6 space-y-4">
      <TouchableOpacity className="rounded bg-green-600 p-4" onPress={handleDownload}>
        <Text className="text-center font-semibold text-white">Download PDF</Text>
      </TouchableOpacity>
      <TouchableOpacity className="rounded bg-blue-600 p-4" onPress={handleShare}>
        <Text className="text-center font-semibold text-white">Share Resume</Text>
      </TouchableOpacity>
      <TouchableOpacity className="rounded bg-purple-600 p-4" onPress={handlePrint}>
        <Text className="text-center font-semibold text-white">Print Resume</Text>
      </TouchableOpacity>
    </View>
  );
}
