import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { TrashIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="container state-container">
        <span style={{ fontSize: '4rem', filter: 'drop-shadow(0px 8px 16px rgba(99,102,241,0.2))' }}>💖</span>
        <h2 className="state-title">Your Wishlist is Empty</h2>
        <p className="state-desc">You haven't bookmarked any products yet. Save your favorite products for easy retrieval later.</p>
        <Link to="/products" className="btn btn-primary" style={{ padding: '12px 32px' }}>
          Browse Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in">
      <header style={{ marginBottom: '40px', marginTop: '20px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Saved Wishlist</h1>
        <p style={{ color: 'var(--text-secondary)' }}>View items you've saved. Move them directly to your shopping cart in one click.</p>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '30px'
      }}>
        {wishlist.map((product) => (
          <div key={product.id} className="glass-card" style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}>
            {/* Image section */}
            <Link to={`/product/${product.id}`} style={{ display: 'block', overflow: 'hidden', height: '240px', background: 'rgba(0,0,0,0.2)' }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400';
                }}
              />
            </Link>

            {/* Info Body */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '10px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)' }}>
                {product.category}
              </span>
              
              <Link to={`/product/${product.id}`}>
                <h3 style={{
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  height: '44px',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  color: 'white'
                }}>
                  {product.name}
                </h3>
              </Link>

              <p style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white', marginTop: '4px' }}>
                ${product.price.toFixed(2)}
              </p>

              {/* Action Buttons Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 44px',
                gap: '12px',
                marginTop: 'auto',
                paddingTop: '16px',
                borderTop: '1px solid var(--glass-border)'
              }}>
                <button
                  onClick={() => handleMoveToCart(product)}
                  className="btn btn-primary"
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    gap: '6px'
                  }}
                >
                  <ShoppingCartIcon style={{ width: '16px', height: '16px' }} />
                  Move to Cart
                </button>

                <button
                  onClick={() => removeFromWishlist(product.id)}
                  style={{
                    height: '44px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(239, 68, 68, 0.05)',
                    border: '1px solid rgba(239, 68, 68, 0.1)',
                    color: 'var(--danger)',
                    transition: 'var(--transition)'
                  }}
                  className="trash-btn"
                  title="Remove from Wishlist"
                >
                  <TrashIcon style={{ width: '18px', height: '18px' }} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
