import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';
import { MagnifyingGlassIcon, FunnelIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(300);
  const [sortBy, setSortBy] = useState('featured');
  const [loading, setLoading] = useState(true);

  // Sync state with URL params on mount or param change
  useEffect(() => {
    setLoading(true);
    
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || 'All';
    
    setSearchQuery(search);
    setSelectedCategory(category);
    
    // Fake loading delay to look professional and premium
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [searchParams]);

  // Handle category button click
  const handleCategoryChange = (category) => {
    const params = new Object();
    const search = searchParams.get('search');
    if (search) params.search = search;
    if (category !== 'All') params.category = category;
    
    setSearchParams(params);
  };

  // Handle search input submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new Object();
    if (searchQuery.trim()) params.search = searchQuery.trim();
    if (selectedCategory !== 'All') params.category = selectedCategory;
    
    setSearchParams(params);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchParams({});
    setSearchQuery('');
    setSelectedCategory('All');
    setMaxPrice(300);
    setSortBy('featured');
  };

  // Find min and max pricing for UI thresholds
  const prices = productsData.map(p => p.price);
  const highestPrice = Math.max(...prices, 300);

  // Computed filtered and sorted products
  const filteredProducts = useMemo(() => {
    let results = [...productsData];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      results = results.filter(
        product =>
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      results = results.filter(
        product => product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Price filter
    results = results.filter(product => product.price <= maxPrice);

    // Sorting logic
    if (sortBy === 'price-low') {
      results.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      results.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      results.sort((a, b) => b.rating - a.rating);
    }

    return results;
  }, [searchQuery, selectedCategory, maxPrice, sortBy]);

  const categoriesList = ['All', 'Electronics', 'Fashion', 'Accessories'];

  return (
    <div className="container animate-fade-in">
      {/* Page Title Header */}
      <header style={{ marginBottom: '40px', marginTop: '20px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Explore Our Catalog</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Find premium, modern products crafted for your daily workflows.</p>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: '40px',
        alignItems: 'start'
      }} className="catalog-layout">
        
        {/* Sidebar Filters Control Panel */}
        <aside className="glass" style={{
          padding: '24px',
          borderRadius: '16px',
          border: '1px solid var(--glass-border)',
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          position: 'sticky',
          top: '100px'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FunnelIcon style={{ width: '20px', height: '20px', color: 'var(--primary)' }} />
              <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Filter Items</span>
            </div>
            <button
              onClick={handleResetFilters}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--text-muted)', cursor: 'pointer' }}
              title="Reset all filters"
              className="icon-hover"
            >
              <ArrowPathIcon style={{ width: '14px', height: '14px' }} />
              Reset
            </button>
          </div>

          {/* Search form */}
          <div>
            <span className="form-label" style={{ marginBottom: '8px', display: 'block' }}>Search Catalog</span>
            <form onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Type keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingRight: '40px', fontSize: '0.9rem', borderRadius: '10px' }}
              />
              <button type="submit" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                <MagnifyingGlassIcon style={{ width: '18px', height: '18px', color: 'var(--text-secondary)' }} />
              </button>
            </form>
          </div>

          {/* Categories select buttons list */}
          <div>
            <span className="form-label" style={{ marginBottom: '12px', display: 'block' }}>Categories</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {categoriesList.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  style={{
                    textAlign: 'left',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: selectedCategory === cat ? 700 : 500,
                    color: selectedCategory === cat ? 'white' : 'var(--text-secondary)',
                    background: selectedCategory === cat ? 'linear-gradient(135deg, var(--primary), #8b5cf6)' : 'rgba(255,255,255,0.02)',
                    border: '1px solid',
                    borderColor: selectedCategory === cat ? 'transparent' : 'var(--glass-border)',
                    transition: 'var(--transition)'
                  }}
                  className="category-btn"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="form-label">Max Price</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white' }}>${maxPrice}</span>
            </div>
            <input
              type="range"
              min="10"
              max={highestPrice}
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{
                width: '100%',
                accentColor: 'var(--primary)',
                background: 'rgba(255,255,255,0.1)',
                height: '6px',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
              <span>$10</span>
              <span>${highestPrice}</span>
            </div>
          </div>
        </aside>

        {/* Catalog Main Products Side grid */}
        <main>
          {/* Controls top banner */}
          <div className="glass" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            borderRadius: '12px',
            marginBottom: '30px',
            border: '1px solid var(--glass-border)',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Showing <strong style={{ color: 'white' }}>{filteredProducts.length}</strong> products
            </span>

            {/* Sorting selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-input"
                style={{
                  width: '160px',
                  padding: '6px 12px',
                  fontSize: '0.85rem',
                  borderRadius: '8px',
                  background: 'var(--dark-surface-solid)'
                }}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Grid, Loading & Empty views */}
          {loading ? (
            <div className="state-container">
              <div className="loader"></div>
              <p style={{ marginTop: '16px', color: 'var(--text-secondary)' }}>Syncing premium collection...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="glass-card state-container" style={{ borderStyle: 'dashed' }}>
              <span style={{ fontSize: '3rem' }}>🔍</span>
              <h3 className="state-title">No Products Found</h3>
              <p className="state-desc">We couldn't find any products matching your specific query filters. Try adjusting the price ceiling or searching for other keywords.</p>
              <button onClick={handleResetFilters} className="btn btn-primary">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .catalog-layout {
            grid-template-columns: 1fr !important;
          }
          aside {
            position: relative !important;
            top: 0 !important;
            margin-bottom: 24px;
          }
        }
        .category-btn:hover {
          border-color: rgba(99, 102, 241, 0.4) !important;
          background: rgba(99, 102, 241, 0.05) !important;
        }
      `}</style>
    </div>
  );
};

export default Products;
