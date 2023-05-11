/* eslint-disable import/no-anonymous-default-export */
import { Ingredient } from '@/contexts/RecipeContext/RecipeContext';
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

  const ingredients = req.body.ingredients || '';

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generatePrompt(ingredients),
      temperature: 0.6,
      max_tokens: 2000,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
    console.log(res);
  } catch (error: any) {
    // Consider adjusting the error handling logic for your use case
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

function generatePrompt(ingredients: Ingredient[]): string {
  //const ingredientsParsed: Ingredient[] = JSON.parse(ingredients || '');
  let promptedIngredients = '';
  ingredients.forEach((ingredient) => {
    promptedIngredients += ingredient.name + ', ';
  });
  return `Génère 3 recettes contenant au moins ${promptedIngredients}.
         Ces recettes doivent avoir plusieurs paramètres (un titre, une liste de tous les ingrédients et le nombre de caloris), mais pas d'instructions. Sépare bien toutes tes recettes dans des parties distinctivesavec un "~" entre chaque recettes`;
}
