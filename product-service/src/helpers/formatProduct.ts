import { Product, Stock } from '@prisma/client';

const formatProduct = (product: Product & { stock: Stock | null; }) => {
  if (!product) return null;

  const { stock, ...rest } = product;

  return {
    ...rest,
    count: stock?.count,
  };
};

export default formatProduct;
