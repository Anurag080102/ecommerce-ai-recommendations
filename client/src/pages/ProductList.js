import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productsAPI } from '../api';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import './ProductList.css';

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  // Get filter values from URL
  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '-createdAt';
  const page = parseInt(searchParams.get('page')) || 1;

  // Fetch categories on mount
  useEffect(() => {
    productsAPI.getCategories()
      .then(res => setCategories(res.data.data))
      .catch(err => console.error('Error loading categories:', err));
  }, []);

  // Fetch products when filters change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = { page, limit: 12, sort };
        if (category) params.category = category;
        if (search) params.search = search;

        const res = await productsAPI.getAll(params);
        setProducts(res.data.data);
        setPagination({
          page: res.data.page,
          pages: res.data.pages,
          total: res.data.total
        });
      } catch (err) {
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, search, sort, page]);

  // Update URL params when filter changes
  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    if (key !== 'page') newParams.delete('page'); // Reset to page 1
    setSearchParams(newParams);
  };

  return (
    <div className="product-list-page">
      <div className="container">
        <div className="page-header">
          <h1>All Products</h1>
          <p>{pagination.total} products found</p>
        </div>

        {/* Filters */}
        <div className="filters">
          <div className="filter-group">
            <label>Category</label>
            <select 
              value={category} 
              onChange={(e) => updateFilter('category', e.target.value)}
              className="input"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <select 
              value={sort} 
              onChange={(e) => updateFilter('sort', e.target.value)}
              className="input"
            >
              <option value="-createdAt">Newest First</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
              <option value="-rating">Top Rated</option>
            </select>
          </div>

          <div className="filter-group search-group">
            <label>Search</label>
            <input
              type="text"
              placeholder="Search products..."
              defaultValue={search}
              className="input"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  updateFilter('search', e.target.value);
                }
              }}
            />
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <Loading message="Loading products..." />
        ) : products.length === 0 ? (
          <div className="no-results">
            <p>No products found. Try a different search or filter.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-4">
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="pagination">
                <button
                  className="btn btn-secondary"
                  disabled={page <= 1}
                  onClick={() => updateFilter('page', page - 1)}
                >
                  Previous
                </button>
                <span className="page-info">
                  Page {pagination.page} of {pagination.pages}
                </span>
                <button
                  className="btn btn-secondary"
                  disabled={page >= pagination.pages}
                  onClick={() => updateFilter('page', page + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
