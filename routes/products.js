const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router({ mergeParams: true });

router.post('/', productController.create);
router.get('/', productController.find);
router.get('/:id', productController.findById);
router.put('/:id', productController.update);
router.delete('/:id', productController.remove);

module.exports = router;