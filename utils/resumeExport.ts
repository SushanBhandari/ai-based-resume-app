import * as Print from 'expo-print';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { ResumeData } from '../context/ResumeContext';

export const generateResumeHTML = (resume: ResumeData): string => {
  return `
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Resume</title>
      </head>
      <body style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h1 style="color: ${resume.themeColor};">${resume.fullName}</h1>
        <h2>${resume.jobTitle}</h2>
        <p>${resume.email} | ${resume.phone} | ${resume.address}</p>

        <h3>Summary</h3>
        <p>${resume.summary}</p>

        <h3>Experience</h3>
        ${resume.experienceList
          .map(
            (exp) => `
            <div>
              <strong>${exp.jobTitle}</strong> at ${exp.company}<br/>
              <small>${exp.startDate} – ${exp.endDate}</small>
              <p>${exp.description}</p>
            </div>
          `
          )
          .join('')}

        <h3>Education</h3>
        ${resume.educationList
          .map(
            (edu) => `
            <div>
              <strong>${edu.degree}</strong> - ${edu.institution} (${edu.year})
              <p>${edu.description}</p>
            </div>
          `
          )
          .join('')}

        <h3>Skills</h3>
        <p>${resume.skillsList.join(', ')}</p>
      </body>
    </html>
  `;
};

export const downloadResumePDF = async (resume: ResumeData) => {
  try {
    const html = generateResumeHTML(resume);
    const { uri } = await Print.printToFileAsync({ html });
    console.log('[Download] PDF temp saved to:', uri);

    const { granted } = await MediaLibrary.requestPermissionsAsync();
    if (!granted) {
      alert('Permission to access media library was denied.');
      return;
    }

    const fileName = uri.split('/').pop();
    const destPath = `${FileSystem.cacheDirectory}${fileName}`;

    await FileSystem.copyAsync({ from: uri, to: destPath });

    const asset = await MediaLibrary.createAssetAsync(destPath);
    await MediaLibrary.createAlbumAsync('Download', asset, false);

    alert('✅ Resume saved to Downloads folder!');
    return destPath;
  } catch (err: any) {
    console.error('[Download Error]', err);
    alert(`Failed to download PDF: ${err.message || err}`);
  }
};

export const shareResumePDF = async (resume: ResumeData) => {
  try {
    const html = generateResumeHTML(resume);
    const { uri } = await Print.printToFileAsync({ html });

    if (!(await Sharing.isAvailableAsync())) {
      alert('Sharing is not available on this device.');
      return;
    }

    await Sharing.shareAsync(uri);
  } catch (err: any) {
    console.error('[Share Error]', err);
    alert(`Failed to share PDF: ${err.message || err}`);
  }
};

export const printResume = async (resume: ResumeData) => {
  try {
    const html = generateResumeHTML(resume);
    await Print.printAsync({ html });
  } catch (err: any) {
    console.error('[Print Error]', err);
    alert(`Failed to print PDF: ${err.message || err}`);
  }
};
