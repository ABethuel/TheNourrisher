import { Recipe } from '@/contexts/RecipeContext/RecipeContext';

export const recipesData: Recipe[] = [
  {
    id: 2,
    ingredients: [
      { id: 1, name: 'Tomate', image: '', quantity: 1 },
      { id: 2, name: 'Concombre', image: '', quantity: 1 },
      { id: 3, name: 'Fromage', image: '', quantity: 1 },
      { id: 4, name: "Huile d'olive", image: '', quantity: 1 },
    ],
    name: 'Salade Feta',
    author: 'Dupont',
    duration: '9 min',
    image:
      'https://www.hervecuisine.com/wp-content/uploads/2019/06/recette-salade-greque-730x520.jpg.webp',
  },
  {
    id: 5,
    ingredients: [
      { id: 1, name: 'Tomate', image: '', quantity: 1 },
      { id: 2, name: 'Poulet', image: '', quantity: 1 },
      { id: 3, name: 'Salade', image: '', quantity: 1 },
      { id: 4, name: "Huile d'olive", image: '', quantity: 1 },
    ],
    name: 'Salade Caesar',
    author: 'Le cuisto',
    duration: '13 min',
    image:
      'https://www.lescuilleresenbois.com/wp-content/uploads/2016/10/14448197_1576893105951551_4927602273460158464_n-1024x1024.jpg',
  },
  {
    id: 6,
    ingredients: [
      { id: 1, name: 'Sucre', image: '', quantity: 1 },
      { id: 2, name: 'Farine', image: '', quantity: 1 },
      { id: 3, name: 'Oeufs', image: '', quantity: 4 },
      { id: 4, name: 'Vanille', image: '', quantity: 1 },
    ],
    name: 'Gâteau mamie',
    author: 'Mamie Gâteau',
    duration: '45 min',
    image:
      'https://assets.afcdn.com/recipe/20130817/49084_w350h265c1cx1206cy804.webp',
  },
];
