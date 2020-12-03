export default class RecipePuppyUnavailableError extends Error {
  constructor() {
    super('Recipe puppy seens to be unavaliable right now. Try again later.');
  }
}
