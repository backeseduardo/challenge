export default class GifServiceUnavaliableError extends Error {
  constructor() {
    super('Gif seens to be unavaliable right now. Try again later.');
  }
}
