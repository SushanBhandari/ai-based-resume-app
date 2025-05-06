import axios from 'axios';

// ✅ Load API key securely (Expo/React Native compatible)
const COHERE_API_KEY = '5uPlczRoxWtj6YVKeknF8SPeYODNKJlRXtDuLIVG';
const COHERE_URL = 'https://api.cohere.ai/v1/generate';

export const generateCohereSummary = async (prompt: string): Promise<string> => {
  try {
    const response = await axios.post(
      'https://api.cohere.ai/v1/generate',
      {
        model: 'command', // you can also try 'command-light' for faster responses
        prompt,
        max_tokens: 200,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${COHERE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const text = response.data.generations[0]?.text?.trim();
    return text || 'No response hai';
  } catch (error) {
    console.error('Cohere API Error:', error);
    return 'Error generating summary';
  }
};
