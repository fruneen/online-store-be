import AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { IProductRecord } from '../models/IProductRecord';
import { IStockRecord } from '../models/IStockRecord';

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: 'eu-central-1',
  convertEmptyValues: true,
});

export const createProductRecord = (item: IProductRecord): Promise<IProductRecord> => new Promise((resolve, reject) => {
  const params = {
    TableName: 'Products',
    Item: item,
  };

  dynamodb.put(<DocumentClient.PutItemInput>params, error => {
    if (error) return reject(error);

    resolve(item);
  });
});

export const createStockRecord = (item: IStockRecord): Promise<IStockRecord> => new Promise((resolve, reject) => {
  const params = {
    TableName: 'Stocks',
    Item: item,
  };

  dynamodb.put(<DocumentClient.PutItemInput>params, error => {
    if (error) return reject(error);

    resolve(item);
  });
});

export const getProductRecordById = (id: string) => new Promise(async (resolve) => {
  let product = {
    id: '',
    title: '',
    description: '',
    price: 0,
    count: 0,
  };

  const productsParams = {
    TableName: 'Products',
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': id,
    },
  };

  const productsSearchResults = await dynamodb.query(productsParams).promise();

  if (productsSearchResults.Items?.length) {
    const [item] = productsSearchResults.Items;

    product = {
      ...product,
      ...item,
    };
  } else {
    resolve(null);
  }


  const stocksParams = {
    TableName: 'Stocks',
    KeyConditionExpression: 'productId = :productId',
    ExpressionAttributeValues: {
      ':productId': id,
    },
  };

  const stocksSearchResults = await dynamodb.query(stocksParams).promise();

  if (stocksSearchResults.Items?.length) {
    const [item] = stocksSearchResults.Items;

    product.count = item.count;
  } else {
    resolve(null);
  }

  resolve(product);
});


export const getProducts = () => new Promise(async (resolve) => {
  let products: unknown = [];

  const productsParams = {
    TableName: 'Products',
  };

  const productsSearchResults = await dynamodb.scan(productsParams).promise();

  if (productsSearchResults.Items?.length) {
    products = productsSearchResults.Items;
  } else {
    resolve(null);
  }


  const stocksParams = {
    TableName: 'Stocks',
  };

  const stocksSearchResults = await dynamodb.scan(stocksParams).promise();

  if (stocksSearchResults.Items?.length) {
    const items = stocksSearchResults.Items;

    if (Array.isArray(products)) {
      products = products.map((product: { id: string; }) => {
        const stockItem = items.find(({ productId }) => productId === product.id);

        if (stockItem) {
          return {
            ...product,
            count: stockItem?.count,
          };
        }

        return product;
      });
    }
  } else {
    resolve(null);
  }

  resolve(products);
});
