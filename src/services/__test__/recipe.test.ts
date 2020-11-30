import axios from 'axios';
import recipepuppyOnionsGarlic from '../../../test/fixtures/recipepuppy-onions-garlic.json';
import RecipeService from '../recipe';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('RecipeService', () => {
  let recipeService: RecipeService;

  beforeEach(() => {
    recipeService = new RecipeService();
  });

  afterEach(() => {
    mockedAxios.get.mockClear();
  });

  it('should return a response with the recipes based on the parameters', async () => {
    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: recipepuppyOnionsGarlic,
    });

    const recipes = await recipeService.find(['onions', 'garlic']);

    expect(recipes).toStrictEqual(recipepuppyOnionsGarlic);
  });
});
