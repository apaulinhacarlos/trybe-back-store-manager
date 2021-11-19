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

module.exports = {
  validateQuantity,
};
