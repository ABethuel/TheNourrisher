/* eslint-disable import/no-anonymous-default-export */
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function (req: any, res: any) {}

function generatePrompt(recipe: string): string {
  return '';
}
