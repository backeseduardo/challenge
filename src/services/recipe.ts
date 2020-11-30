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

export default class RecipeService {
  private baseUrl = 'http://www.recipepuppy.com/api/';

  async find(ingredients: string[]): Promise<RecipeResponse> {
    const response = await axios.get<RecipeResponse>(
      `${this.baseUrl}?i=${ingredients.join(',')}`,
    );

    return response.data;
  }
}
