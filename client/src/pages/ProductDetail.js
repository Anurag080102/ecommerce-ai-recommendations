import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productsAPI, recommendationsAPI } from '../api';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, isInCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product and recommendations
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Get product details
        const productRes = await productsAPI.getById(id);
        setProduct(productRes.data.data);

        // Get AI recommendations
        const recsRes = await recommendationsAPI.getForProduct(id, 6);
        setRecommendations(recsRes.data.data);
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      toast.error('Product is out of stock');
      return;
    }
    addToCart(product, quantity);
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  if (loading) return <Loading message="Loading product..." />;
  
  if (error || !product) {
    return (
      <div className="container py-8">
        <div className="error-state">
          <h2>Product Not Found</h2>
          <p>Sorry, we couldn't find the product you're looking for.</p>
          <Link to="/products" className="btn btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link> / 
          <Link to="/products">Products</Link> / 
          <span>{product.name}</span>
        </nav>

        {/* Product Info */}
        <div className="product-detail">
          <div className="product-image-wrapper">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="product-detail-image"
            />
            {product.featured && (
              <span className="badge badge-primary">Featured</span>
            )}
          </div>

          <div className="product-info-wrapper">
            <span className="product-category-tag">{product.category}</span>
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-rating-detail">
              <span className="stars">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </span>
              <span>{product.rating.toFixed(1)} ({product.numReviews} reviews)</span>
            </div>

            <p className="product-description">{product.description}</p>

            <div className="product-price-detail">
              ${product.price.toFixed(2)}
            </div>

            {/* Tags */}
            <div className="product-tags">
              {product.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>

            {/* Stock Status */}
            <div className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
              {product.stock > 0 ? `✓ In Stock (${product.stock} available)` : '✗ Out of Stock'}
            </div>

            {/* Add to Cart */}
            <div className="add-to-cart-section">
              <div className="quantity-selector">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
              <button 
                className={`btn btn-primary add-btn ${isInCart(product._id) ? 'in-cart' : ''}`}
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                {isInCart(product._id) ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>

        {/* AI Recommendations Section */}
        {recommendations.length > 0 && (
          <section className="recommendations-section">
            <div className="section-header">
              <h2>🤖 AI-Powered Recommendations</h2>
              <p>Similar products you might like</p>
            </div>
            <div className="grid grid-cols-4">
              {recommendations.map(rec => (
                <ProductCard 
                  key={rec._id} 
                  product={rec} 
                  showSimilarity={true}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
