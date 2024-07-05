const Product = require('../models/Product');

// Calculate Jaccard Similarity between two tag arrays
// Returns a score from 0 to 1 (higher = more similar)
const calculateJaccardSimilarity = (arr1, arr2) => {
  if (!arr1.length && !arr2.length) return 0;
  
  const set1 = new Set(arr1.map(t => t.toLowerCase()));
  const set2 = new Set(arr2.map(t => t.toLowerCase()));
  
  const intersection = [...set1].filter(item => set2.has(item)).length;
  const union = new Set([...set1, ...set2]).size;
  
  return union === 0 ? 0 : intersection / union;
};

// Give bonus score if products are in same category
const calculateCategoryBoost = (cat1, cat2) => {
  return cat1 === cat2 ? 0.3 : 0;
};

// Calculate price similarity - products in similar price range score higher
const calculatePriceSimilarity = (price1, price2) => {
  const maxPrice = Math.max(price1, price2);
  const minPrice = Math.min(price1, price2);
  
  if (maxPrice === 0) return 0.2;
  
  const ratio = minPrice / maxPrice;
  return ratio * 0.2; // Max 0.2 boost for same price
};

// Get AI-powered product recommendations using content-based filtering
// Uses tag similarity, category matching, and price similarity
const getRecommendations = async (req, res) => {
  try {
    const { productId } = req.params;
    const { limit = 6 } = req.query;

    // Find the target product
    const targetProduct = await Product.findById(productId);
    
    if (!targetProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Get all other products (exclude the target product)
    const allProducts = await Product.find({ 
      _id: { $ne: productId },
      stock: { $gt: 0 } // Only recommend in-stock items
    }).select('-__v');

    // Calculate similarity scores for each product
    const scoredProducts = allProducts.map(product => {
      // Tag similarity (Jaccard) - 60% weight
      const tagSimilarity = calculateJaccardSimilarity(
        targetProduct.tags,
        product.tags
      ) * 0.6;

      // Category boost - 20% weight
      const categoryBoost = calculateCategoryBoost(
        targetProduct.category,
        product.category
      ) * 0.666; // 0.3 * 0.666 ≈ 0.2 max contribution

      // Price similarity - 20% weight
      const priceSimilarity = calculatePriceSimilarity(
        targetProduct.price,
        product.price
      );

      // Combined score
      const totalScore = tagSimilarity + categoryBoost + priceSimilarity;

      return {
        product,
        score: totalScore,
        debug: {
          tagSimilarity: tagSimilarity.toFixed(3),
          categoryBoost: categoryBoost.toFixed(3),
          priceSimilarity: priceSimilarity.toFixed(3),
        },
      };
    });

    // Filter products with minimum similarity threshold
    const minThreshold = 0.1;
    const filteredProducts = scoredProducts
      .filter(item => item.score >= minThreshold)
      .sort((a, b) => b.score - a.score)
      .slice(0, parseInt(limit, 10));

    // If not enough similar products, fill with same category products
    if (filteredProducts.length < parseInt(limit, 10)) {
      const existingIds = new Set(filteredProducts.map(p => p.product._id.toString()));
      const sameCategoryProducts = scoredProducts
        .filter(item => 
          item.product.category === targetProduct.category && 
          !existingIds.has(item.product._id.toString())
        )
        .slice(0, parseInt(limit, 10) - filteredProducts.length);
      
      filteredProducts.push(...sameCategoryProducts);
    }

    res.json({
      success: true,
      targetProduct: {
        _id: targetProduct._id,
        name: targetProduct.name,
        category: targetProduct.category,
        tags: targetProduct.tags,
      },
      count: filteredProducts.length,
      data: filteredProducts.map(item => ({
        ...item.product.toObject(),
        similarityScore: item.score.toFixed(3),
      })),
    });
  } catch (error) {
    console.error('Recommendations error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Product not found - invalid ID format',
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while generating recommendations',
    });
  }
};

// Get trending/popular products based on ratings
const getTrendingProducts = async (req, res) => {
  try {
    const { limit = 8 } = req.query;

    // Get products sorted by rating and number of reviews
    const trendingProducts = await Product.find({ stock: { $gt: 0 } })
      .sort({ rating: -1, numReviews: -1 })
      .limit(parseInt(limit, 10))
      .select('-__v');

    res.json({
      success: true,
      count: trendingProducts.length,
      data: trendingProducts,
    });
  } catch (error) {
    console.error('Trending products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching trending products',
    });
  }
};

module.exports = {
  getRecommendations,
  getTrendingProducts,
};
