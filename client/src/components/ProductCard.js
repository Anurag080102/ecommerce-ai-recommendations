import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import './ProductCard.css';

const ProductCard = ({ product, showSimilarity = false }) => {
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stock <= 0) {
      toast.error('Product is out of stock');
      return;
    }
    
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Link to={`/products/${product._id}`} className="product-card card">
      <div className="product-image-container">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        {product.featured && (
          <span className="product-badge featured">Featured</span>
        )}
        {product.stock <= 0 && (
          <span className="product-badge out-of-stock">Out of Stock</span>
        )}
        {showSimilarity && product.similarityScore && (
          <span className="product-badge similarity">
            {Math.round(parseFloat(product.similarityScore) * 100)}% Match
          </span>
        )}
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-rating">
          <span className="stars">
            {'★'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
          </span>
          <span className="review-count">({product.numReviews})</span>
        </div>

        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button
            className={`btn btn-primary btn-sm add-to-cart ${isInCart(product._id) ? 'in-cart' : ''}`}
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
          >
            {isInCart(product._id) ? '✓ In Cart' : '+ Add'}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
