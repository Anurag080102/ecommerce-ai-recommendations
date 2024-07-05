const express = require('express');
const router = express.Router();
const {
  getRecommendations,
  getTrendingProducts,
} = require('../controllers/recommendationController');

// Recommendation routes
router.get('/trending', getTrendingProducts);
router.get('/:productId', getRecommendations);

module.exports = router;
