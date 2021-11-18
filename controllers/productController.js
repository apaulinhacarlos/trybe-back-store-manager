const { StatusCodes } = require('http-status-codes');
const productService = require('../services/productService');

const create = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const newProduct = await productService.create({ name, quantity });

    if (newProduct.err) {
      if (newProduct.err.code === 'invalid_data') {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ err: newProduct.err });
      }
    }

    return res.status(StatusCodes.CREATED).json(newProduct.ops[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};
