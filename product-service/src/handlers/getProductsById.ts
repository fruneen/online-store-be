import createResponse from 'helpers/createResponse';
import { getProductById } from 'resources/product/product.service';

const getProductsById = async (event: { pathParameters: { id: string }; }) => {
  const { id } = event.pathParameters;

  try {
    const product = await getProductById(id);

    if (!product) return createResponse(404, { message: 'Product not found' });

    return createResponse(200, product);
  } catch (error) {
    return createResponse(500, error);
  }
};

export default getProductsById;
