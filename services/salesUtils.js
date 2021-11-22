const productModel = require('../models/productModel');

const validateQuantity = (quantity) => {
  if (quantity < 0 || quantity === 0 || typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }
  return false;
};

const validateProduct = async ({ productId, quantity }) => {
  const productFound = await productModel.findById(productId);
  if (!productFound) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }

  if (productFound.quantity < quantity) {
    return {
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
      },
    };
  }

  return false;
};

module.exports = {
  validateQuantity,
  validateProduct,
};
