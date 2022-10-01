import { PrismaClient } from '@prisma/client';

import createResponse from 'helpers/createResponse';
import formatProducts from 'helpers/formatProducts';

const prisma = new PrismaClient();

const getProductsList = async () => {
  console.log('Get products list');

  try {
    const products = await prisma.product.findMany({
      include: {
        stock: true,
      },
    });

    const formattedProducts = formatProducts(products);

    return createResponse(200, formattedProducts);
  } catch (error) {
    return createResponse(500, error);
  }
};

export default getProductsList;
