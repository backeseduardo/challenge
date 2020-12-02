import nock from 'nock';
import recipepuppyOnionsGarlic from '../fixtures/recipepuppy-onions-garlic.json';

describe('RecipeController', () => {
  beforeEach(() => {
    nock('http://www.recipepuppy.com', {})
      .get((url) => url.includes('api'))
      .reply(200, recipepuppyOnionsGarlic);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should return a list of recipes', async () => {
    const { status, body } = await global.testRequest.get(
      '/recipes/?i=onions,garlic',
    );

    expect(status).toBe(200);
    expect(body).toStrictEqual({
      keywords: ['onions', 'garlic'],
      recipes: recipepuppyOnionsGarlic.results.map((result) => ({
        title: result.title,
        ingredients: result.ingredients,
        link: result.href,
        gif: '',
      })),
    });
  });

  it('should return status 400 if the parameter i is sended', async () => {
    const { status } = await global.testRequest.get('/recipes/');

    expect(status).toBe(400);
  });

  it('should return status 400 if no parameters are sended', async () => {
    const { status } = await global.testRequest.get('/recipes/?i=');

    expect(status).toBe(400);
  });

  it('should return status 400 if more than 3 parameters are sended', async () => {
    const { status } = await global.testRequest.get(
      '/recipes/?i=onions,garlic,tomato,pasta',
    );

    expect(status).toBe(400);
  });
});
