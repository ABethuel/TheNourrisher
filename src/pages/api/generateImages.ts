/* eslint-disable import/no-anonymous-default-export */
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function (req: any, res: any) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
    return;
  }

  const recipe = req.body.recipe || '';

  try {
    const response = await openai.createImage({
      prompt: generatePrompt(recipe),
      n: 1,
      size: '256x256',
    });
    res.status(200).json({ image: response.data.data[0].url });
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      });
    }
  }
}

function generatePrompt(recipe: string): string {
  return `Plat ${recipe} bien présenté`;
}
