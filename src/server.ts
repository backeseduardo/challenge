import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { json } from 'body-parser';
import RecipeFactory from './factories/recipe';

export default class ServerSetup extends Server {
  constructor() {
    super(process.env.NODE_ENV === 'development');
  }

  init() {
    this.setupMiddlewares();
    this.setupControllers();
  }

  private setupMiddlewares() {
    this.app.use(json());
  }

  private setupControllers() {
    const recipeController = new RecipeFactory().build();

    this.addControllers([recipeController]);
  }

  getApp() {
    return this.app;
  }

  start(port: number = 3000): void {
    this.app.listen(port, () => {
      Logger.Imp(`Ready at http://localhost:${port}`);
    });
  }
}
