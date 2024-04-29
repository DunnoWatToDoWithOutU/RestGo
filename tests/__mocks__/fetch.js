export function mockResponse(statusCode, data) {
  return jest.fn().mockResolvedValue(
    new Response(JSON.stringify(data), {
      status: statusCode,
      statusText: statusCode === 200 ? 'OK' : 'Error',
    })
  );
}
