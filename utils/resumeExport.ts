import * as Print from 'expo-print';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { ResumeData } from '../context/ResumeContext';
import { StorageAccessFramework } from 'expo-file-system';

// Escape HTML for safety
const escapeHTML = (text: string = '') =>
  text.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>');

// Template: CLASSIC
const renderClassicHTML = (resume: ResumeData) => `
  <h1 style="color:${resume.themeColor};">${resume.fullName}</h1>
  <h2>${resume.jobTitle}</h2>
  <p>${resume.email} | ${resume.phone} | ${resume.address}</p>
  <h3>Summary</h3><p>${escapeHTML(resume.summary)}</p>
  <h3>Experience</h3>
  ${resume.experienceList
    .map(
      (exp) => `
    <div>
      <strong>${exp.jobTitle}</strong> at ${exp.company}<br/>
      <small>${exp.startDate} – ${exp.endDate}</small>
      <p>${escapeHTML(exp.description)}</p>
    </div>`
    )
    .join('')}
  <h3>Education</h3>
  ${resume.educationList
    .map(
      (edu) => `
    <div>
      <strong>${edu.degree}</strong> - ${edu.institution} (${edu.year})
      <p>${escapeHTML(edu.description)}</p>
    </div>`
    )
    .join('')}
  <h3>Skills</h3>
  <p>${resume.skillsList.join(', ')}</p>
`;

// Template: MODERN
const renderModernHTML = (resume: ResumeData) => `
  <div style="display: flex; font-family: Arial, sans-serif;">
    <div style="width: 30%; background-color: ${resume.themeColor}; color: white; padding: 16px;">
      <h2>${resume.fullName}</h2>
      <p>${resume.jobTitle}</p>
      <p>${resume.email}</p>
      <p>${resume.phone}</p>
      <p>${resume.address}</p>
      <h4>Skills</h4>
      <p>${resume.skillsList.join(', ')}</p>
    </div>
    <div style="width: 70%; padding: 16px;">
      ${resume.summary && `<h3>Summary</h3><p>${escapeHTML(resume.summary)}</p>`}
      ${
        resume.experienceList.length > 0 &&
        `
        <h3>Experience</h3>
        ${resume.experienceList
          .map(
            (exp) => `
          <div>
            <strong>${exp.jobTitle}</strong> at ${exp.company}<br/>
            <small>${exp.startDate} – ${exp.endDate}</small>
            <p>${escapeHTML(exp.description)}</p>
          </div>`
          )
          .join('')}
      `
      }
      ${
        resume.educationList.length > 0 &&
        `
        <h3>Education</h3>
        ${resume.educationList
          .map(
            (edu) => `
          <div>
            <strong>${edu.degree}</strong> - ${edu.institution} (${edu.year})
            <p>${escapeHTML(edu.description)}</p>
          </div>`
          )
          .join('')}
      `
      }
    </div>
  </div>
`;

// Template: COMPACT
const renderCompactHTML = (resume: ResumeData) => `
  <div style="font-size: 12px; font-family: sans-serif;">
    <p><strong>${resume.fullName}</strong> — ${resume.jobTitle}</p>
    <p>${resume.email} | ${resume.phone} | ${resume.address}</p>
    ${resume.summary && `<p>📝 ${escapeHTML(resume.summary)}</p>`}
    ${resume.experienceList
      .map(
        (exp) => `
      <p>✅ ${exp.jobTitle} @ ${exp.company} (${exp.startDate} - ${exp.endDate})</p>
    `
      )
      .join('')}
    ${resume.educationList
      .map(
        (edu) => `
      <p>🎓 ${edu.degree} - ${edu.institution} (${edu.year})</p>
    `
      )
      .join('')}
    <p>🛠 ${resume.skillsList.join(', ')}</p>
  </div>
`;

// Generate HTML based on selected template
export const generateResumeHTML = (resume: ResumeData): string => {
  const template = resume.template || 'classic';
  return `
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Resume</title>
      </head>
      <body style="padding: 20px;">
        ${
          template === 'modern'
            ? renderModernHTML(resume)
            : template === 'compact'
              ? renderCompactHTML(resume)
              : renderClassicHTML(resume)
        }
      </body>
    </html>
  `;
};

// Download
export const downloadResumePDF = async (resume: ResumeData) => {
  try {
    const html = generateResumeHTML(resume);
    const { uri } = await Print.printToFileAsync({ html });

    const fileName = `${resume.fullName?.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'my'}-resume.pdf`;

    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
      alert('Permission to access storage was denied.');
      return;
    }

    const fileData = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const fileUri = await StorageAccessFramework.createFileAsync(
      permissions.directoryUri,
      fileName,
      'application/pdf'
    );
    await FileSystem.writeAsStringAsync(fileUri, fileData, {
      encoding: FileSystem.EncodingType.Base64,
    });

    alert('✅ Resume saved to your Downloads folder!');
  } catch (err: any) {
    console.error('[SAF Download Error]', err);
    alert(`Download failed: ${err.message || err}`);
  }
};

// Share
export const shareResumePDF = async (resume: ResumeData) => {
  try {
    const html = generateResumeHTML(resume);
    const { uri } = await Print.printToFileAsync({ html });

    if (!(await Sharing.isAvailableAsync())) {
      alert('Sharing not available on this device');
      return;
    }

    await Sharing.shareAsync(uri);
  } catch (err: any) {
    console.error('[Share Error]', err);
    alert(`Share failed: ${err.message || err}`);
  }
};

// Print
export const printResume = async (resume: ResumeData) => {
  try {
    const html = generateResumeHTML(resume);
    await Print.printAsync({ html });
  } catch (err: any) {
    console.error('[Print Error]', err);
    alert(`Print failed: ${err.message || err}`);
  }
};
