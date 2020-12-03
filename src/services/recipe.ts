import axios from 'axios';
import { IRecipe } from '../dtos/recipe';
import RecipePuppyUnavailableError from '../errors/recipe-puppy-unavailable';
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
    try {
      const response = await axios.get<RecipeResponse>(
        `${this.baseUrl}?i=${keywords.join(',')}`,
      );

      const recipes = await Promise.all(
        response.data.results.map(async (result) => ({
          title: result.title,
          ingredients: result.ingredients.split(', ').sort(),
          link: result.href,
          gif: await this.gifService.find(result.title),
        })),
      );

      return recipes;
    } catch (error) {
      if (error?.response?.status >= 500) {
        throw new RecipePuppyUnavailableError();
      }

      throw error;
    }
  }
}
