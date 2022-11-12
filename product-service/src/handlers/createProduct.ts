import { APIGatewayProxyEvent } from 'aws-lambda';
import { PrismaClient } from '@prisma/client';
import Joi from 'joi';

import createResponse from 'helpers/createResponse';
import formatProduct from '../helpers/formatProduct';
import { isBase64 } from '../helpers/isBase64';

const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  count: Joi.number().required(),
  photoUrl: Joi.string().required(),
});

const prismaClient = new PrismaClient();

const createProduct = async (event: APIGatewayProxyEvent) => {
  let { body } = event;

  console.log('Create product');
  console.log('Event body: ', body);

  try {
    if (!body) return createResponse(400, { message: 'Bad request' });


    if (typeof body === 'string') {
      if (isBase64(body)) {
        body = Buffer.from(body, 'base64').toString();
      }

      body = JSON.parse(body);
    }

    const { value: validatedData, error } = schema.validate(body);

    if (error) return createResponse(400, error);

    return await prismaClient.$transaction(async (prisma) => {

      const createdProduct = await prisma.product.create({
        data: {
          title: validatedData.title,
          description: validatedData.description,
          price: validatedData.price,
          photoUrl: validatedData.photoUrl,
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

export default createProduct;
