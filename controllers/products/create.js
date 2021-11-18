const { StatusCodes } = require('http-status-codes');
const services = require('../../services/products');

const create = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    
    if (!name || !quantity) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'You must inform the "name" and "quantity" of the products' });
    }

    const newProduct = { name, quantity };
    await services.create(newProduct);

    return res.status(StatusCodes.CREATED).json(newProduct);
  } catch (error) {
    next(error);
  }
};

module.exports = create;