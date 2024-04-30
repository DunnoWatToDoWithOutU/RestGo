const getPromotion = require('../src/libs/getPromotion').default;
const getPromotions = require('../src/libs/getPromotions').default;
global.fetch = jest.fn();

describe('getPromotions and getPromotion', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  // getPromotions Tests:

  it('fetches promotions successfully', async () => {
    const mockResponse = [{ id: 1, name: 'Promotion 1' }];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const data = await getPromotions();

    expect(fetch).toHaveBeenCalledWith('https://rest-go.vercel.app/api/v2/promotions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    expect(data).toEqual(mockResponse);
  });

  it('handles an empty response', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [],
  });

  const data = await getPromotions();

  expect(fetch).toHaveBeenCalledWith('https://rest-go.vercel.app/api/v2/promotions', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  expect(data).toEqual([]);
});


  it('throws an error when fetching promotions fails', async () => {
  fetch.mockResolvedValueOnce({
    ok: false,
    status: 500, // Assuming non-OK responses have a status code indicating the error
  });

  await expect(getPromotions()).rejects.toThrowError('Error failed to fetch');
});

  // getPromotion Tests:

  it('fetches a promotion successfully', async () => {
    const mockResponse = { id: '661ebc2b5b44c4a6a7da8018', name: 'Test Promotion2-3' };
    const promotionID = '661ebc2b5b44c4a6a7da8018';
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const data = await getPromotion(promotionID);

    expect(fetch).toHaveBeenCalledWith(`https://rest-go.vercel.app/api/v2/promotions/${promotionID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    expect(data).toEqual(mockResponse);
  });

  it('throws an error when promotionID is invalid (empty string)', async () => {
    await expect(getPromotion('')).rejects.toThrowError('Error failed to fetch');
  });

  it('throws an error when promotionID is not a string', async () => {
    await expect(getPromotion(123)).rejects.toThrowError('Error failed to fetch');
  });

  it('throws an error when promotion is not found', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(getPromotion('invalid-promotion-id')).rejects.toThrowError('Error failed to fetch');
  });

  it('throws an error when network request fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Network Error'));

    await expect(getPromotion('valid-promotion-id')).rejects.toThrowError('Network Error');
  });
});
