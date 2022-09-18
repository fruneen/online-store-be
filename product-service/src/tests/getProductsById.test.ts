import * as handler from '../../handler';
import productListJson from 'mock/productList.json';

test('Get product by ID', async () => {
  const productId = '7567ec4b-b10c-48c5-9345-fc73c48a80aa';
  const product = productListJson.find(p => p.id === productId);

  return expect(await handler.getProductsById({
    pathParameters: {
      id: productId,
    },
  }))
    .toStrictEqual({
      'body': JSON.stringify(product),
      'headers': {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
      },
      'statusCode': 200,
    });
});

test('Get non-existent product by ID', async () => {
  const productId = '7567ec4b-b10c-9345';

  return expect(await handler.getProductsById({
    pathParameters: {
      id: productId,
    },
  }))
    .toStrictEqual({
      'body': JSON.stringify({ message: 'Product not found' }),
      'headers': {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
      },
      'statusCode': 404,
    });
});
