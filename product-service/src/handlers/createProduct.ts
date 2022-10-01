import { APIGatewayProxyEvent } from 'aws-lambda';
import { PrismaClient } from '@prisma/client';
import Joi from 'joi';

import createResponse from 'helpers/createResponse';
import formatProduct from '../helpers/formatProduct';

const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  count: Joi.number().required(),
});

const prismaClient = new PrismaClient();

const getProductsList = async (event: APIGatewayProxyEvent) => {
  const { body } = event;

  console.log('Get products list');
  console.log('Event body: ', body);

  try {
    if (!body) return createResponse(400, { message: 'Bad request' });

    const { value: validatedData, error } = await schema.validate(body);

    if (error) return createResponse(400, error);

    return await prismaClient.$transaction(async (prisma) => {

      const createdProduct = await prisma.product.create({
        data: {
          title: validatedData.title,
          description: validatedData.description,
          price: validatedData.price,
          stock: {
            create: {
              count: validatedData.count,
            },
          },
        },
        include: {
          stock: true,
        },
      });

      const formattedProduct = formatProduct(createdProduct);

      return createResponse(201, formattedProduct);
    });

  } catch (error) {
    console.log(error);

    return createResponse(500, error);
  }
};

export default getProductsList;
