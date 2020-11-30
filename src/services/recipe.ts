import axios from 'axios';

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

export interface FindRecipeResponse {
  title: string;
  link: string;
  ingredients: string;
}

export default class RecipeService {
  private baseUrl = 'http://www.recipepuppy.com/api/';

  async find(ingredients: string[]): Promise<FindRecipeResponse[]> {
    const response = await axios.get<RecipeResponse>(
      `${this.baseUrl}?i=${ingredients.join(',')}`,
    );

    return response.data.results.map((result) => ({
      title: result.title,
      ingredients: result.ingredients,
      link: result.href,
    }));
  }
}
