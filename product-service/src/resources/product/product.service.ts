import productList from 'mock/productList.json';

export const getProductById = (id: string) => {
  return new Promise(resolve => resolve(productList.find(product => product.id === id)));
};

export const getProducts = () => {
  return new Promise(resolve => resolve(productList));
};
