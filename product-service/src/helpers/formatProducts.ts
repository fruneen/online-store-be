import { Product, Stock } from '@prisma/client';
import formatProduct from 'helpers/formatProduct';

const formatProducts = (products: Array<Product & { stock: Stock | null; }> ) => {
  if (!products || !products.length) return [];


  return products.map((product) => formatProduct(product));
};

export default formatProducts;
