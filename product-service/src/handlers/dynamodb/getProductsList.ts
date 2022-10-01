import createResponse from 'helpers/createResponse';

import { getProducts } from './clients/dynamodb-client';

const getProductsList = async () => {
  console.log('Get products list');

  try {
    const products = await getProducts();

    return createResponse(200, products);
  } catch (error) {
    return createResponse(500, error);
  }
};

export default getProductsList;
