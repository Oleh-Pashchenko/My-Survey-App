import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const generateSurveyQuestions = async (topic) => {
  const prompt = `Generate a list of survey questions with multiple-choice options for a survey about ${topic}. Format the output as a JSON array, where each element is an object with the question text and an array of options.`;

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
    });

    const generatedText = chatCompletion.choices[0].message.content?.trim();
    return JSON.parse(generatedText);
  } catch (error) {
    console.error('Error generating survey questions:', error);
    throw error;
  }
};

export { generateSurveyQuestions };
