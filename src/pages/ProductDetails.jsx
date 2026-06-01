import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon, HeartIcon as HeartSolidIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Find target product
  const baseProduct = useMemo(() => {
    return productsData.find((p) => p.id === parseInt(id));
  }, [id]);

  // States
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Sync state with base data
  useEffect(() => {
    if (baseProduct) {
      setProduct({ ...baseProduct });
      setQuantity(1);
      setActiveTab('description');
      setReviewSuccess(false);
      window.scrollTo(0, 0); // scroll to top when opening details
    }
  }, [baseProduct]);

  if (!baseProduct) {
    return (
      <div className="container state-container">
        <span style={{ fontSize: '3rem' }}>⚠️</span>
        <h3 className="state-title">Product Not Found</h3>
        <p className="state-desc">The item you are attempting to review does not exist in our catalog or may have been discontinued.</p>
        <Link to="/products" className="btn btn-primary">
          Back to Catalog
        </Link>
      </div>
    );
  }

  if (!product) return null;

  // Toggle wishlist state
  const wishlisted = isInWishlist(product.id);

  // Filter related products (same category, different ID)
  const relatedProducts = productsData
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // Add a review simulation
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const newReview = {
      id: Date.now(),
      name: newReviewName.trim(),
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    setProduct((prev) => {
      const updatedReviews = [newReview, ...prev.reviews];
      // Recalculate average rating
      const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
      const newAverage = parseFloat((totalRating / updatedReviews.length).toFixed(1));

      return {
        ...prev,
        reviews: updatedReviews,
        reviewsCount: updatedReviews.length,
        rating: newAverage
      };
    });

    setNewReviewName('');
    setNewReviewComment('');
    setNewReviewRating(5);
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 4000);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '20px' }}>
      {/* Breadcrumb */}
      <nav style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '32px' }}>
        <Link to="/" className="footer-link">Home</Link> &gt;{' '}
        <Link to="/products" className="footer-link">Products</Link> &gt;{' '}
        <Link to={`/products?category=${product.category}`} className="footer-link">{product.category}</Link> &gt;{' '}
        <span style={{ color: 'var(--text-primary)' }}>{product.name}</span>
      </nav>

      {/* Main Grid: Left Side Image, Right Side Buy Actions */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '50px',
        marginBottom: '60px'
      }} className="details-layout">
        
        {/* Left Side Product Image Viewer */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="glass-card" style={{
            padding: '24px',
            width: '100%',
            height: '460px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.2)',
            position: 'relative'
          }}>
            <img
              src={product.image}
              alt={product.name}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(0px 10px 25px rgba(0,0,0,0.4))'
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60';
              }}
            />
          </div>
        </div>

        {/* Right Side Purchases Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <span className="badge badge-secondary" style={{ color: 'var(--primary)', borderColor: 'rgba(99,102,241,0.3)', background: 'rgba(99,102,241,0.05)', marginBottom: '10px' }}>
              {product.category}
            </span>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.2, color: 'white', marginBottom: '8px' }}>
              {product.name}
            </h1>
            
            {/* Stars Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', color: '#f59e0b' }}>
                {[...Array(5)].map((_, i) => {
                  const starVal = i + 1;
                  return starVal <= Math.floor(product.rating) ? (
                    <StarSolidIcon key={i} style={{ width: '18px', height: '18px' }} />
                  ) : (
                    <StarIcon key={i} style={{ width: '18px', height: '18px', stroke: 'var(--text-muted)' }} />
                  );
                })}
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{product.rating}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>({product.reviewsCount} verified reviews)</span>
            </div>
          </div>

          {/* Pricing Box */}
          <div style={{
            borderTop: '1px solid var(--glass-border)',
            borderBottom: '1px solid var(--glass-border)',
            padding: '16px 0',
            display: 'flex',
            alignItems: 'baseline',
            gap: '12px'
          }}>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: 'white' }}>
              ${product.price.toFixed(2)}
            </span>
            <span className="badge badge-secondary" style={{ color: 'var(--success)', borderColor: 'rgba(16, 185, 129, 0.2)', background: 'rgba(16, 185, 129, 0.05)' }}>
              In Stock & Ready
            </span>
          </div>

          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
            {product.description}
          </p>

          {/* Quantity selector and Cart controls */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginTop: '10px' }}>
            {/* Quantity */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              border: '1px solid var(--glass-border)',
              borderRadius: '12px',
              padding: '4px',
              background: 'rgba(255,255,255,0.02)'
            }}>
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}
              >
                -
              </button>
              <span style={{ width: '40px', textAlign: 'center', fontWeight: 700, fontSize: '1rem' }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}
              >
                +
              </button>
            </div>

            {/* Add to Cart button */}
            <button
              onClick={handleAddToCart}
              className="btn btn-primary"
              style={{
                flexGrow: 1,
                padding: '14px 24px',
                borderRadius: '12px',
                gap: '10px'
              }}
            >
              <ShoppingBagIcon style={{ width: '20px', height: '20px' }} />
              Add to Shopping Cart
            </button>

            {/* Wishlist button */}
            <button
              onClick={() => toggleWishlist(product)}
              className="btn btn-secondary"
              style={{
                width: '50px',
                height: '50px',
                padding: 0,
                borderRadius: '12px'
              }}
              title={wishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
            >
              {wishlisted ? (
                <HeartSolidIcon style={{ width: '24px', height: '24px', color: 'var(--danger)' }} />
              ) : (
                <HeartOutlineIcon style={{ width: '24px', height: '24px' }} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Container: Specs, Reviews */}
      <section style={{ marginBottom: '80px' }}>
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--glass-border)',
          marginBottom: '24px'
        }}>
          <button
            onClick={() => setActiveTab('description')}
            className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
          >
            Aura Specs
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
          >
            Customer Reviews ({product.reviews.length})
          </button>
        </div>

        {/* Tab Contents: Specs */}
        {activeTab === 'description' && (
          <div className="glass-card animate-fade-in" style={{ padding: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '40px' }}>
            <div>
              <h3 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '16px' }}>Key Highlights</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                {product.features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '16px' }}>Technical Parameters</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', paddingBottom: '8px', borderBottom: '1px dashed var(--glass-border)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{key}</span>
                    <strong style={{ color: 'white' }}>{val}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab Contents: Reviews */}
        {activeTab === 'reviews' && (
          <div className="animate-fade-in reviews-layout" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            alignItems: 'start'
          }}>
            
            {/* Reviews Listing */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontWeight: 700, fontSize: '1.2rem' }}>Verified Reviews</h3>
              {product.reviews.length === 0 ? (
                <div className="glass-card" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Be the first to rate this item! Write your thoughts below.
                </div>
              ) : (
                product.reviews.map((rev) => (
                  <div key={rev.id} className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ color: 'white' }}>{rev.name}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{rev.date}</span>
                    </div>
                    {/* rating */}
                    <div style={{ display: 'flex', color: '#f59e0b' }}>
                      {[...Array(5)].map((_, i) => (
                        <StarSolidIcon key={i} style={{ width: '14px', height: '14px', fill: i < rev.rating ? '#f59e0b' : 'none', stroke: i < rev.rating ? '#f59e0b' : 'var(--text-muted)' }} />
                      ))}
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                      "{rev.comment}"
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Write a simulated review */}
            <div className="glass-card" style={{ padding: '24px' }}>
              <h3 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '16px' }}>Share Your Review</h3>
              {reviewSuccess && (
                <div className="glass" style={{
                  padding: '12px',
                  borderRadius: '8px',
                  borderColor: 'var(--success)',
                  color: 'var(--success)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  🎉 Review published successfully! Thank you.
                </div>
              )}
              <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Reviewer Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={newReviewName}
                    onChange={(e) => setNewReviewName(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Star Rating</label>
                  <select
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(parseInt(e.target.value))}
                    className="form-input"
                    style={{ background: 'var(--dark-surface-solid)' }}
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (5 - Perfect)</option>
                    <option value="4">⭐⭐⭐⭐ (4 - Very Good)</option>
                    <option value="3">⭐⭐⭐ (3 - Average)</option>
                    <option value="2">⭐⭐ (2 - Below Par)</option>
                    <option value="1">⭐ (1 - Terrible)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Review Details</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="What did you like or dislike? How does it perform?"
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    className="form-input"
                    style={{ resize: 'none' }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Submit Verified Review
                </button>
              </form>
            </div>
          </div>
        )}
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '60px' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '32px' }}>Customers Also Viewed</h2>
          <div className="product-grid">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <style>{`
        .tab-btn {
          padding: 12px 24px;
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-secondary);
          border-bottom: 2px solid transparent;
          transition: var(--transition);
        }
        .tab-btn:hover {
          color: white;
        }
        .tab-btn.active {
          color: var(--primary);
          border-bottom-color: var(--primary);
        }
        @media (max-width: 900px) {
          .details-layout, .reviews-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetails;
