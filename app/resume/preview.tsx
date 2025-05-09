import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useResume } from '../../context/ResumeContext';
import PreviewCard from '../../components/PreviewCard';
import Navbar from 'components/NavBar';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { StorageAccessFramework } from 'expo-file-system';
import { generateResumeHTML } from '../../utils/resumeExport';

export default function ResumePreviewScreen() {
  const { resumeData } = useResume();

  const getFileName = () => {
    return `${resumeData.fullName?.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'my'}-resume.pdf`;
  };

  const handleSaveToDownloads = async () => {
    try {
      const html = generateResumeHTML(resumeData);
      const { uri: printUri } = await Print.printToFileAsync({ html });

      const fileName = getFileName();

      const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permissions.granted) {
        Alert.alert('Permission Denied', 'Access to storage was not granted.');
        return;
      }

      const fileData = await FileSystem.readAsStringAsync(printUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const newFileUri = await StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        fileName,
        'application/pdf'
      );

      await FileSystem.writeAsStringAsync(newFileUri, fileData, {
        encoding: FileSystem.EncodingType.Base64,
      });

      Alert.alert('✅ Resume Saved', `File saved as:\n${fileName}`);
    } catch (err: any) {
      console.error('[Download Error]', err);
      Alert.alert('Download Failed', err.message || 'Unexpected error occurred.');
    }
  };

  const handleShare = async () => {
    try {
      const html = generateResumeHTML(resumeData);
      const { uri: tempUri } = await Print.printToFileAsync({ html });

      const fileName = getFileName(); // example: john_doe-resume.pdf
      const destPath = `${FileSystem.documentDirectory}${fileName}`;

      // Copy to a path with the correct filename
      await FileSystem.copyAsync({ from: tempUri, to: destPath });

      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert('Not Supported', 'Sharing is not available on this device.');
        return;
      }

      await Sharing.shareAsync(destPath, {
        mimeType: 'application/pdf',
        dialogTitle: 'Share your resume',
      });
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
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="mb-4 text-2xl font-bold">Your Resume</Text>
      <PreviewCard />
      <Navbar />

      <View className="mt-6 space-y-4">
        <TouchableOpacity className="rounded bg-green-600 p-4" onPress={handleSaveToDownloads}>
          <Text className="text-center font-semibold text-white">Save to Downloads</Text>
        </TouchableOpacity>

        <TouchableOpacity className="rounded bg-blue-600 p-4" onPress={handleShare}>
          <Text className="text-center font-semibold text-white">Share Resume</Text>
        </TouchableOpacity>

        <TouchableOpacity className="rounded bg-indigo-600 p-4" onPress={handlePrint}>
          <Text className="text-center font-semibold text-white">Print Resume</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
