import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { IRecipe } from '../dtos/recipe';
import RecipeService from '../services/recipe';

export interface GetResponse {
  keywords: string[];
  recipes: IRecipe[];
}

@Controller('recipes')
export default class RecipeController {
  private recipeService: RecipeService;

  constructor(recipeService: RecipeService) {
    this.recipeService = recipeService;
  }

  @Get()
  async get(
    request: Request,
    response: Response<GetResponse | { message: string }>,
  ): Promise<void> {
    if (!request.query?.i) {
      response.status(400).send({
        message: 'At least one ingredient should be sended',
      });

      return;
    }

    const keywords: string[] = (request.query?.i as string)?.split(',');

    if (keywords.length > 3) {
      response.status(400).send({
        message: 'Maximum of 3 parameters are expected',
      });

      return;
    }

    const recipes = await this.recipeService.find(keywords);

    response.send({
      keywords,
      recipes,
    });
  }
}
