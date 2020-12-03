import axios from 'axios';
import GifServiceUnavaliableError from '../errors/gif-service-unavailable';

export default class GifService {
  private baseUrl = 'https://api.giphy.com/v1/gifs/search';

  async find(searchTerm: string): Promise<any> {
    try {
      const response = await axios.get(
        `${this.baseUrl}?api_key=${process.env.GIF_API_KEY}&q=${searchTerm}&limit=1`,
      );

      const data = response?.data?.data[0];

      return data?.images?.original?.url;
    } catch (error) {
      if (error?.response?.status >= 500) {
        throw new GifServiceUnavaliableError();
      }

      throw error;
    }
  }
}
