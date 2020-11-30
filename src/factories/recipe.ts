import RecipeController from '../controllers/recipe';
import RecipeService from '../services/recipe';
import Factory from './factory';

export default class RecipeFactory implements Factory<RecipeController> {
  build(): RecipeController {
    return new RecipeController(new RecipeService());
  }
}
