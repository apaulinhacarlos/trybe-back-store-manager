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

const find = async (req, res, next) => {
  try {
    const salesList = await saleService.find();

    if (!salesList) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ err: salesList.err });
    }

    return res.status(StatusCodes.OK).json({ sales: salesList });
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundSale = await saleService.findById(id);

    if (foundSale.err && foundSale.err.code === 'not_found') {
      return res.status(StatusCodes.NOT_FOUND).json({ err: foundSale.err });
    }

    return res.status(StatusCodes.OK).json(foundSale);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  find,
  findById,
  // update,
  // remove,
};