const createResponse = (statusCode: number, message: unknown) => ({
  statusCode,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json; charset=utf-8',
  },
  body: JSON.stringify(message),
});

export default createResponse;
