import { APIGatewayProxyEvent } from 'aws-lambda';
import { v4 } from 'uuid';
import Joi from 'joi';

import createResponse from 'helpers/createResponse';

import { createProductRecord, createStockRecord } from './clients/dynamodb-client';

const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  count: Joi.number().required(),
});

const createProduct = async (event: APIGatewayProxyEvent) => {
  let { body } = event;

  console.log('Get products list');
  console.log('Event body: ', body);

  try {
    if (!body) return createResponse(400, { message: 'Bad request' });


    if (typeof body === 'string') {
      body = JSON.parse(body);
    }

    const { value: validatedData, error } = schema.validate(body);

    if (error) return createResponse(400, error);

    const createdProductRecord = await createProductRecord({
      id:  v4(),
      title: validatedData.title,
      description: validatedData.description,
      price: validatedData.price,
    });

    if (!createdProductRecord) return createResponse(500, { message: 'Internal server error' });

    const createdStockRecord = await createStockRecord({
      productId: createdProductRecord?.id,
      count: validatedData.count,
    });

    return createResponse(200, {
      ...createdProductRecord,
      count: createdStockRecord.count,
    });

  } catch (error) {
    console.log(error);

    return createResponse(500, error);
  }
};

export default createProduct;
