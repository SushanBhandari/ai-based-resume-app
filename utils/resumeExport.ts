// utils/resumeExport.ts
import * as Print from 'expo-print';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { ResumeData } from '../context/ResumeContext';

export const generateResumeHTML = (resume: ResumeData): string => {
  if (resume.template === 'modern') {
    return `
      <html>
        <body style="font-family: Arial; padding: 20px;">
          <h1 style="color: teal;">${resume.fullName}</h1>
          ...
        </body>
      </html>`;
  }

  if (resume.template === 'minimal') {
    return `
      <html>
        <body style="font-family: sans-serif; font-size: 14px;">
          <h2>${resume.fullName}</h2>
          ...
        </body>
      </html>`;
  }

  // classic template (default)
  return `
    <html>
      <body>
        <h1>${resume.fullName}</h1>
        ...
      </body>
    </html>`;
};

export const downloadResumePDF = async (resume: ResumeData) => {
  try {
    const html = generateResumeHTML(resume);
    const { uri } = await Print.printToFileAsync({ html });
    console.log('[Download] PDF temp saved to:', uri);

    const { granted } = await MediaLibrary.requestPermissionsAsync();
    if (!granted) {
      alert('Permission to access media library denied.');
      return;
    }

    // Copy file to a permanent path before importing
    const fileName = uri.split('/').pop();
    if (!FileSystem.documentDirectory) {
      throw new Error('Document directory is not available');
    }
    const newPath = FileSystem.documentDirectory + fileName;

    await FileSystem.copyAsync({
      from: uri,
      to: newPath,
    });

    const asset = await MediaLibrary.createAssetAsync(newPath);
    await MediaLibrary.createAlbumAsync('Download', asset, false);

    alert('Resume PDF saved to Downloads folder!');
    return newPath;
  } catch (err) {
    console.error('[Download Error]', err);
    alert('Failed to download PDFs');
  }
};

export const shareResumePDF = async (resume: ResumeData) => {
  try {
    const html = generateResumeHTML(resume);
    const { uri } = await Print.printToFileAsync({ html });

    console.log('[Share] Generated PDF at:', uri);

    const isAvailable = await Sharing.isAvailableAsync();
    if (!isAvailable) {
      alert('Sharing is not supported on this device');
      return;
    }

    await Sharing.shareAsync(uri);
  } catch (err) {
    console.error('[Share Error]', err);
    alert('Failed to share resume');
  }
};

export const printResume = async (resume: ResumeData) => {
  try {
    const html = generateResumeHTML(resume);
    await Print.printAsync({ html });
  } catch (err) {
    console.error('[Print Error]', err);
    alert('Failed to print resume');
  }
};
