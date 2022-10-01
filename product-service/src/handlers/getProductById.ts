import { APIGatewayProxyEvent } from 'aws-lambda';
import { PrismaClient } from '@prisma/client';

import createResponse from 'helpers/createResponse';
import formatProduct  from 'helpers/formatProduct';

const prisma = new PrismaClient();

const getProductById = async (event: APIGatewayProxyEvent & { pathParameters: { id: string }; }) => {
  const { id } = event.pathParameters;

  console.log('Get product by id');
  console.log('ID: ', id);

  if (!id) return createResponse(400, { message: 'Bad request' });

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        stock: true,
      },
    });

    if (!product) return createResponse(404, { message: 'Product not found' });

    const formattedProduct = formatProduct(product);

    return createResponse(200, formattedProduct);
  } catch (error) {
    return createResponse(500, error);
  }
};

export default getProductById;
