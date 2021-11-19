const { StatusCodes } = require('http-status-codes');

module.exports = (err, req, res, _next) => {
  console.log(err.message);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'middleware error' });
};