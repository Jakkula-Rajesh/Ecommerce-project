const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createOrder, getOrder } = require('../controllers/orderController');

router.post('/', protect, createOrder);
router.get('/:id', protect, getOrder);

module.exports = router;
