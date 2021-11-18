const products = require('../../models/products/index')('products');

// const isValid = (name, quantity) => {
//   if (typeof name !== 'string') return false;
//   if (typeof quantity !== 'number') return false;
//   return true;
// };

const create = async (product) => {
  // const { name, quantity } = product;
  // const isProductValid = isValid(name, quantity);

  // if (!isProductValid) return false;

  return products.create(product);

  // return result;
};

module.exports = create;
