import axios from 'axios';
import gifGarlic from '../../../test/fixtures/gif-garlic.json';
import GifService from '../gif';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GifService', () => {
  let gifService: GifService;

  beforeEach(() => {
    gifService = new GifService();
  });

  afterEach(() => {
    mockedAxios.get.mockClear();
  });

  it('should return a response with the gif based on the parameters', async () => {
    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: gifGarlic,
    });

    const gifUrl = await gifService.find('garlic');

    expect(gifUrl).toStrictEqual(gifGarlic.data[0].images.original.url);
  });

  it('should return undefined if not find a gif', async () => {
    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: {
        data: [],
        pagination: {
          total_count: 0,
          count: 0,
          offset: 0,
        },
        meta: {
          status: 200,
          msg: 'OK',
          response_id: 'hpuqulan53ksoaqqq6u72hi4lkgqqdlt9g4gfsrl',
        },
      },
    });

    const gifUrl = await gifService.find('garliccarcadra');

    expect(gifUrl).toBeUndefined();
  });
});
