import * as handler from '../../handler';
import productListJson from 'mock/productList.json';

test('Get products', async () => {
  return expect(await handler.getProductsList())
    .toStrictEqual({
      'body': JSON.stringify(productListJson),
      'headers': {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
      },
      'statusCode': 200,
    });
});
