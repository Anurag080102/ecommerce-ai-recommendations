import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI, recommendationsAPI } from '../api';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch featured and trending products on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featuredRes, trendingRes] = await Promise.all([
          productsAPI.getAll({ featured: true, limit: 4 }),
          recommendationsAPI.getTrending(4)
        ]);
        
        setFeaturedProducts(featuredRes.data.data);
        setTrendingProducts(trendingRes.data.data);
      } catch (err) {
        console.error('Error loading home page:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading message="Loading..." />;

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <h1 className="hero-title">
            Smart Shopping with
            <span className="gradient-text"> AI Recommendations</span>
          </h1>
          <p className="hero-subtitle">
            Discover products tailored just for you. Our AI-powered recommendation 
            engine finds similar items based on your interests.
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary">
              Shop Now
            </Link>
            <a href="#features" className="btn btn-secondary">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
            <Link to="/products?featured=true" className="view-all">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-4">
            {featuredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="section section-gray">
        <div className="container">
          <div className="section-header">
            <h2>🔥 Trending Now</h2>
            <Link to="/products" className="view-all">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-4">
            {trendingProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section">
        <div className="container">
          <h2 className="text-center mb-4">Why ShopAI?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">🤖</span>
              <h3>AI Recommendations</h3>
              <p>Smart product suggestions using content-based filtering and Jaccard similarity</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🔒</span>
              <h3>Secure Auth</h3>
              <p>JWT-based authentication with encrypted passwords using bcrypt</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">⚡</span>
              <h3>Fast & Scalable</h3>
              <p>Built with MERN stack for optimal performance and scalability</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
