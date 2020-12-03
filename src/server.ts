import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { json } from 'body-parser';
import { Application } from 'express';
import RecipeFactory from './factories/recipe';

export default class ServerSetup extends Server {
  constructor() {
    super(process.env.NODE_ENV === 'development');
  }

  init(): void {
    this.setupMiddlewares();
    this.setupControllers();
  }

  private setupMiddlewares(): void {
    this.app.use(json());
  }

  private setupControllers(): void {
    const recipeController = new RecipeFactory().build();

    this.addControllers([recipeController]);
  }

  getApp(): Application {
    return this.app;
  }

  start(port: number = 3000): void {
    this.app.listen(port, () => {
      Logger.Imp(`Ready at http://localhost:${port}`);
    });
  }
}
