import nock from 'nock';
import gifGarlic from '../fixtures/gif-garlic.json';
import recipepuppyOnionsGarlic from '../fixtures/recipepuppy-onions-garlic.json';

describe('RecipeController', () => {
  describe('Services availabe', () => {
    beforeEach(() => {
      nock('http://www.recipepuppy.com', {})
        .persist()
        .get((url) => url.includes('api'))
        .reply(200, recipepuppyOnionsGarlic);

      nock('https://api.giphy.com', {})
        .persist()
        .get((url) => url.includes('v1/gifs/search'))
        .reply(200, gifGarlic);
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
        recipes: recipepuppyOnionsGarlic.results.map((result) => {
          return {
            title: result.title,
            ingredients: result.ingredients.split(', ').sort(),
            link: result.href,
            gif: gifGarlic.data[0].images.original.url,
          };
        }),
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

  describe('Services unavalible', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should tell user if recipe puppy is not available', async () => {
      nock('http://www.recipepuppy.com', {})
        .persist()
        .get((url) => url.includes('api'))
        .reply(500);

      nock('https://api.giphy.com', {})
        .persist()
        .get((url) => url.includes('v1/gifs/search'))
        .reply(200, gifGarlic);

      const { status, body } = await global.testRequest.get(
        '/recipes/?i=onions,garlic',
      );

      expect(status).toBe(503);
      expect(body.message).toBe(
        'Recipe puppy seens to be unavaliable right now. Try again later.',
      );
    });

    it('should tell user if gif is not available', async () => {
      nock('http://www.recipepuppy.com', {})
        .persist()
        .get((url) => url.includes('api'))
        .reply(200, recipepuppyOnionsGarlic);

      nock('https://api.giphy.com', {})
        .persist()
        .get((url) => url.includes('v1/gifs/search'))
        .reply(500);

      const { status, body } = await global.testRequest.get(
        '/recipes/?i=onions,garlic',
      );

      expect(status).toBe(503);
      expect(body.message).toBe(
        'Gif seens to be unavaliable right now. Try again later.',
      );
    });
  });
});
