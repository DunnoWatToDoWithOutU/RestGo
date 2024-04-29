const createReviews = require('../src/libs/createReviews').default;

global.fetch = jest.fn();

describe('createReviews', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('creates a review successfully', async () => {
    const mockResponse = { success: true };
    const rating = 4;
    const reviewText = 'Great hotel!';
    const hotelId = '123';
    const userId = '456';

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const data = await createReviews(rating, reviewText, hotelId, userId);

    expect(fetch).toHaveBeenCalledWith(`https://rest-go.vercel.app/api/v2/hotels/${hotelId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ rating, reviewText, userID: userId }),
    });
    expect(data).toEqual(mockResponse);
  });

  it('throws an error when creating a review fails', async () => {
    const rating = 4;
    const reviewText = 'Great hotel!';
    const hotelId = '123';
    const userId = '456';

    fetch.mockRejectedValueOnce(new Error('Failed to create review'));

    await expect(createReviews(rating, reviewText, hotelId, userId)).rejects.toThrowError('Failed to create review');
  });

  // Test for invalid rating (less than 1 or more than 5)
  it('throws an error when rating is invalid (less than 1)', async () => {
    const rating = 0;
    const reviewText = 'Great hotel!';
    const hotelId = '123';
    const userId = '456';

    await expect(createReviews(rating, reviewText, hotelId, userId)).rejects.toThrowError('Error failed to fetch');
  });

  it('throws an error when rating is invalid (more than 5)', async () => {
    const rating = 6;
    const reviewText = 'Great hotel!';
    const userId = '123';
    const hotelId = '456';

    await expect(createReviews(rating, reviewText, hotelId, userId)).rejects.toThrowError('Error failed to fetch');
  });

  // Test for empty or missing review text
  it('throws an error when review text is empty', async () => {
    const rating = 4;
    const reviewText = '';
    const hotelId = '123';
    const userId = '456';

    await expect(createReviews(rating, reviewText, hotelId, userId)).rejects.toThrowError('Error failed to fetch');
  });

  // Test for network errors
  it('throws an error when network request fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Network Error'));

    const rating = 4;
    const reviewText = 'Great hotel!';
    const hotelId = '123';
    const userId = '456';

    await expect(createReviews(rating, reviewText, hotelId, userId)).rejects.toThrowError('Network Error');
  });
});
