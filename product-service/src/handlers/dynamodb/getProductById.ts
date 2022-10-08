import { APIGatewayProxyEvent } from 'aws-lambda';

import createResponse from 'helpers/createResponse';
import { getProductRecordById } from './clients/dynamodb-client';

const getProductById = async (event: APIGatewayProxyEvent & { pathParameters: { id: string }; }) => {
  const { id } = event.pathParameters;

  console.log('Get product by id');
  console.log('ID: ', id);

  if (!id) return createResponse(400, { message: 'Bad request' });

  try {
    const product = await getProductRecordById(id);

    if (!product) return createResponse(404, { message: 'Product not found' });

    return createResponse(200, product);
  } catch (error) {
    return createResponse(500, error);
  }
};

export default getProductById;
