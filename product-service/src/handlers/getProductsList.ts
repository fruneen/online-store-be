import createResponse from 'helpers/createResponse';
import { getProducts } from 'resources/product/product.service';

const getProductsList = async () => {
  try {
    const products = await getProducts();

    return createResponse(200, products);
  } catch (error) {
    return createResponse(500, error);
  }
};

export default getProductsList;
