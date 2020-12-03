import axios from 'axios';

export default class GifService {
  private baseUrl = 'https://api.giphy.com/v1/gifs/search';

  async find(searchTerm: string): Promise<any> {
    const response = await axios.get(
      `${this.baseUrl}?api_key=${process.env.GIF_API_KEY}&q=${searchTerm}&limit=1`,
    );

    const data = response?.data?.data[0];

    return data?.images?.original?.url;
  }
}
