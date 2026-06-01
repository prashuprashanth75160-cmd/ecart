import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { StarIcon, HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const wishlisted = isInWishlist(product.id);

  // Render full and half stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<StarIcon key={i} className="star-icon filled" style={{ width: '16px', height: '16px', fill: '#f59e0b', stroke: '#f59e0b' }} />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} style={{ position: 'relative', display: 'inline-block' }}>
            <StarIcon className="star-icon" style={{ width: '16px', height: '16px', stroke: '#f59e0b' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', overflow: 'hidden' }}>
              <StarIcon style={{ width: '16px', height: '16px', fill: '#f59e0b', stroke: '#f59e0b' }} />
            </div>
          </div>
        );
      } else {
        stars.push(<StarIcon key={i} className="star-icon" style={{ width: '16px', height: '16px', stroke: 'var(--text-muted)' }} />);
      }
    }
    return stars;
  };

  return (
    <div className="glass-card product-card animate-slide-up" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative'
    }}>
      {/* Wishlist Button Overlay */}
      <button
        onClick={() => toggleWishlist(product)}
        className="wishlist-btn-overlay glass"
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 10,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'var(--transition)'
        }}
      >
        {wishlisted ? (
          <HeartSolidIcon style={{ width: '20px', height: '20px', color: 'var(--danger)' }} />
        ) : (
          <HeartOutlineIcon style={{ width: '20px', height: '20px', color: 'var(--text-primary)' }} />
        )}
      </button>

      {/* Product Image Link */}
      <Link to={`/product/${product.id}`} style={{ display: 'block', overflow: 'hidden', height: '240px', background: 'rgba(0,0,0,0.2)' }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          className="product-card-img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60'; // fallback
          }}
        />
      </Link>

      {/* Card Info Body */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '10px' }}>
        {/* Category */}
        <span style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          color: 'var(--primary)'
        }}>{product.category}</span>

        {/* Title */}
        <Link to={`/product/${product.id}`}>
          <h3 style={{
            fontSize: '1.05rem',
            fontWeight: 600,
            lineHeight: 1.4,
            height: '44px',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            color: 'var(--text-primary)',
            transition: 'var(--transition)'
          }} className="product-title-hover">
            {product.name}
          </h3>
        </Link>

        {/* Rating Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
          <div style={{ display: 'flex' }}>
            {renderStars(product.rating)}
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>({product.reviewsCount})</span>
        </div>

        {/* Price & Cart CTA Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'auto',
          paddingTop: '12px'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Price</span>
            <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white' }}>${product.price.toFixed(2)}</p>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="btn btn-primary"
            style={{
              width: '40px',
              height: '40px',
              padding: 0,
              borderRadius: '10px'
            }}
            title="Add to Cart"
          >
            <ShoppingCartIcon style={{ width: '18px', height: '18px' }} />
          </button>
        </div>
      </div>

      <style>{`
        .product-card:hover .product-card-img {
          transform: scale(1.08);
        }
        .wishlist-btn-overlay:hover {
          background: rgba(255, 255, 255, 0.15) !important;
          transform: scale(1.1);
        }
        .product-title-hover:hover {
          color: var(--primary) !important;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
