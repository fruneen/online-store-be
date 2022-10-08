import Joi from 'joi';
import { SQSEvent } from 'aws-lambda';
import { PrismaClient } from '@prisma/client';

import createResponse from 'helpers/createResponse';
import snsClient from 'services/email.service';

const prisma = new PrismaClient();

const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  count: Joi.number().required(),
});

const catalogBatchProcess = async (event: SQSEvent) => {
  try {
    const records = event.Records;

    console.log(event.Records);

    await Promise.all(records.map(async (record) => {
      const { body } = record;

      console.log('Processing message');
      console.log('Event body: ', body);

      const { value: product, error } = schema.validate(JSON.parse(body));

      if (error) {
        console.log('Validation error', error);
        return;
      }

      const createdProduct = await prisma.product.create({
        data: {
          title: product.title,
          description: product.description,
          price: product.price,
          stock: {
            create: {
              count: product.count,
            },
          },
        },
        include: {
          stock: true,
        },
      });

      console.log('Product created');

      await snsClient.publish(
        {
          Subject: 'Catalog batch process',
          Message: `Product ${createdProduct.title} was created. Price: ${createdProduct.price}.`,
          TopicArn: process.env.SNS_ARN || '',
          MessageAttributes: {
            pricingCategory: {
              DataType: 'String',
              StringValue: product.price >= 50 ? 'High' : 'Low',
            },
          },
        },
        () => { console.log('Email sent'); },
      ).promise();
    }));
  } catch (error) {
    console.log(error);
    return createResponse(500, error);
  }
};

export default catalogBatchProcess;
