import axios from 'axios';

const COHERE_API_KEY = process.env.EXPO_COHERE_API_KEY;
const COHERE_URL = 'https://api.cohere.ai/v1/generate';

export const generateCohereSummary = async (prompt: string): Promise<string> => {
  try {
    const response = await axios.post(
      COHERE_URL,
      {
        model: 'command',
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
