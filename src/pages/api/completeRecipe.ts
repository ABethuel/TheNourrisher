import { Recipe } from '@/contexts/RecipeContext/RecipeContext';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// eslint-disable-next-line import/no-anonymous-default-export
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
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generatePrompt(recipe),
      temperature: 0.6,
      max_tokens: 1000,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
    console.log(res);
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

function generatePrompt(recipe: Recipe): string {
  let promptedIngredients = '';
  if (recipe.ingredients.length > 0) {
    recipe.ingredients.forEach((ingredient) => {
      promptedIngredients += ingredient.name + ', ';
    });
  }

  return `Donne les instructions, le temps de cuisson et la difficulté d'une recette 
  (ne note pas les ingrédients et n'ajoute pas de texte superflu) dont le 
  nom est : "${recipe.name}" et les ingrédients sont ${promptedIngredients} sous le format : - Temps de cuisson : 12min   - Difficultés : Facile  - Etapes : ...`;
}
