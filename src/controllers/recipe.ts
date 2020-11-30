import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import RecipeService from '../services/recipe';

export interface GetResponse {
  keywords: string[];
  recipes: Array<{
    title: string;
    ingredients: string[];
    link: string;
    gif: string;
  }>;
}

@Controller('recipes')
export default class RecipeController {
  private recipeService: RecipeService;

  constructor(recipeService: RecipeService) {
    this.recipeService = recipeService;
  }

  @Get()
  async get(request: Request, response: Response): Promise<void> {
    if (!request.query?.i) {
      response.status(400).send({
        message: 'At least one ingredient should be sended',
      });

      return;
    }

    const ingredients: string[] = (request.query?.i as string)?.split(',');

    const recipes = await this.recipeService.find(ingredients);

    response.send(recipes);
  }
}
