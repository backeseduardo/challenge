import axios from 'axios';
import { IRecipe } from '../dtos/recipe';

export interface RecipeResponse {
  title: string;
  version: number;
  href: string;
  results: Array<{
    title: string;
    href: string;
    ingredients: string;
    thumbnail: string;
  }>;
}

export default class RecipeService {
  private baseUrl = 'http://www.recipepuppy.com/api/';

  async find(keywords: string[]): Promise<IRecipe[]> {
    const response = await axios.get<RecipeResponse>(
      `${this.baseUrl}?i=${keywords.join(',')}`,
    );

    return response.data.results.map((result) => ({
      title: result.title,
      ingredients: result.ingredients,
      link: result.href,
      gif: '', // TODO (backes): get the gif
    }));
  }
}
