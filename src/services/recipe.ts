import axios from 'axios';
import { IRecipe } from '../dtos/recipe';
import GifService from './gif';

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

  private gifService: GifService;

  constructor(gifService: GifService = new GifService()) {
    this.gifService = gifService;
  }

  async find(keywords: string[]): Promise<IRecipe[]> {
    const response = await axios.get<RecipeResponse>(
      `${this.baseUrl}?i=${keywords.join(',')}`,
    );

    const recipes = await Promise.all(
      response.data.results.map(async (result) => ({
        title: result.title,
        ingredients: result.ingredients,
        link: result.href,
        gif: await this.gifService.find(result.title),
      })),
    );

    return recipes;
  }
}
