const express = require('express');
const products = require('./products');
// const sales = require('./sales');

const router = express.Router({ mergeParams: true });

router.use('/products', products);
// router.use('/sales', sales);

module.exports = router;
