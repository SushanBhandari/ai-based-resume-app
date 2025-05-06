import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

const shareFile = async () => {
  const fileUri = FileSystem.documentDirectory + 'resume.txt'; // or .pdf

  await FileSystem.writeAsStringAsync(fileUri, 'This is your resume content');

  if (!(await Sharing.isAvailableAsync())) {
    alert('Sharing is not available on this device');
    return;
  }

  await Sharing.shareAsync(fileUri);
};
