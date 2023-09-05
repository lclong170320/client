import * as request from './httpRequest';

export const search = async (q) => {
  try {
    const res = await request.get(`products?product_name=${q}`);
    return res.products;
  } catch (error) {
    console.log(error);
  }
};
