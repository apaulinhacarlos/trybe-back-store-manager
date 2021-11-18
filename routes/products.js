const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router({ mergeParams: true });

router.post('/', productController.create);

module.exports = router;