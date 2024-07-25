import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span>🛍️</span>
            <span>ShopAI</span>
          </Link>
          <p className="footer-tagline">
            AI-Powered Shopping Experience
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-section">
            <h4>Shop</h4>
            <Link to="/products">All Products</Link>
            <Link to="/products?category=Electronics">Electronics</Link>
            <Link to="/products?category=Clothing">Clothing</Link>
          </div>

          <div className="footer-section">
            <h4>Account</h4>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/cart">Cart</Link>
          </div>

          <div className="footer-section">
            <h4>About</h4>
            <a href="#features">Features</a>
            <a href="#recommendations">AI Recommendations</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2024 ShopAI. Built with ❤️ using MERN Stack + AI</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
