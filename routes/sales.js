const express = require('express');
const saleController = require('../controllers/saleController');

const router = express.Router({ mergeParams: true });

router.post('/', saleController.create);
router.get('/', saleController.find);
router.get('/:id', saleController.findById);
router.put('/:id', saleController.update);
// router.delete('/:id', saleController.remove);

module.exports = router;