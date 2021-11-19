const { StatusCodes } = require('http-status-codes');
const saleService = require('../services/saleService');

const create = async (req, res, next) => {
  try {
    const sales = req.body;

    const newSales = await saleService.create(sales);

    if (newSales.err && newSales.err.code === 'invalid_data') {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ err: newSales.err });
    }

    return res.status(StatusCodes.OK).json(newSales.ops[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  // find,
  // findById,
  // update,
  // remove,
};