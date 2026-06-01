import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import {
  ShoppingBagIcon,
  HeartIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ArrowRightStartOnRectangleIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  return (
    <nav className="glass" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid var(--glass-border)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            fontSize: '1.8rem',
            fontWeight: 800,
            letterSpacing: '-0.5px'
          }} className="gradient-text">E-CART</span>
          <span style={{ fontSize: '1.4rem' }}>🛍️</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="desktop-menu" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px'
        }}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link>
          
          {/* Categories Dropdown in Header */}
          <div className="dropdown" style={{ position: 'relative' }}>
            <span className="nav-link" style={{ cursor: 'pointer' }}>Categories</span>
            <div className="dropdown-menu glass" style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              display: 'none',
              flexDirection: 'column',
              minWidth: '180px',
              borderRadius: '8px',
              padding: '8px 0',
              marginTop: '12px',
              border: '1px solid var(--glass-border)',
              boxShadow: 'var(--shadow)'
            }}>
              <Link to="/products?category=Electronics" className="dropdown-item">Electronics</Link>
              <Link to="/products?category=Fashion" className="dropdown-item">Fashion</Link>
              <Link to="/products?category=Accessories" className="dropdown-item">Accessories</Link>
            </div>
          </div>
        </div>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearchSubmit} className="desktop-search" style={{
          position: 'relative',
          width: '240px'
        }}>
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{
              padding: '8px 16px 8px 36px',
              fontSize: '0.85rem',
              borderRadius: '20px'
            }}
          />
          <MagnifyingGlassIcon style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '16px',
            height: '16px',
            color: 'var(--text-secondary)'
          }} />
        </form>

        {/* Nav Icons & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Wishlist Icon */}
          <Link to="/wishlist" style={{ position: 'relative', display: 'flex', alignItems: 'center' }} title="Wishlist">
            <HeartIcon style={{ width: '24px', height: '24px', transition: 'var(--transition)' }} className="icon-hover" />
            {wishlistCount > 0 && (
              <span className="badge badge-primary" style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                minWidth: '18px',
                height: '18px',
                padding: 0
              }}>{wishlistCount}</span>
            )}
          </Link>

          {/* Cart Icon */}
          <Link to="/cart" style={{ position: 'relative', display: 'flex', alignItems: 'center' }} title="Cart">
            <ShoppingBagIcon style={{ width: '24px', height: '24px', transition: 'var(--transition)' }} className="icon-hover" />
            {cartCount > 0 && (
              <span className="badge badge-primary" style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                minWidth: '18px',
                height: '18px',
                padding: 0
              }}>{cartCount}</span>
            )}
          </Link>

          {/* User Profile Auth Control */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="desktop-user">
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Hi, {user.name}
              </span>
              <button onClick={logout} title="Logout" style={{ display: 'flex', alignItems: 'center' }}>
                <ArrowRightStartOnRectangleIcon style={{ width: '24px', height: '24px', color: 'var(--danger)' }} />
              </button>
            </div>
          ) : (
            <Link to="/login" style={{ display: 'flex', alignItems: 'center' }} title="Account">
              <UserIcon style={{ width: '24px', height: '24px' }} className="icon-hover" />
            </Link>
          )}

          {/* Hamburger Menu Toggle (Mobile) */}
          <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{
            display: 'none',
            alignItems: 'center'
          }}>
            {isOpen ? <XMarkIcon style={{ width: '28px', height: '28px' }} /> : <Bars3Icon style={{ width: '28px', height: '28px' }} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="mobile-menu glass animate-fade-in" style={{
          position: 'absolute',
          top: '80px',
          left: 0,
          right: 0,
          padding: '24px',
          borderBottom: '1px solid var(--glass-border)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          zIndex: 999
        }}>
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{
                paddingLeft: '40px',
                borderRadius: '12px'
              }}
            />
            <MagnifyingGlassIcon style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '18px',
              height: '18px',
              color: 'var(--text-secondary)'
            }} />
          </form>

          <Link to="/" className="nav-link-mobile" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/products" className="nav-link-mobile" onClick={() => setIsOpen(false)}>Products</Link>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '12px', borderLeft: '2px solid var(--primary)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Categories</span>
            <Link to="/products?category=Electronics" className="nav-link-mobile" onClick={() => setIsOpen(false)}>Electronics</Link>
            <Link to="/products?category=Fashion" className="nav-link-mobile" onClick={() => setIsOpen(false)}>Fashion</Link>
            <Link to="/products?category=Accessories" className="nav-link-mobile" onClick={() => setIsOpen(false)}>Accessories</Link>
          </div>

          {user ? (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid var(--glass-border)',
              paddingTop: '16px'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Logged in as</span>
                <p style={{ fontWeight: 700 }}>{user.name}</p>
              </div>
              <button onClick={() => { logout(); setIsOpen(false); }} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary" onClick={() => setIsOpen(false)} style={{ width: '100%' }}>
              Log In
            </Link>
          )}
        </div>
      )}

      {/* Adding custom responsive styling here dynamically for header links */}
      <style>{`
        .nav-link {
          font-weight: 500;
          font-size: 0.95rem;
          color: var(--text-secondary);
          transition: var(--transition);
        }
        .nav-link:hover {
          color: var(--text-primary);
        }
        .nav-link-mobile {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .icon-hover:hover {
          color: var(--primary);
          transform: scale(1.08);
        }
        .dropdown:hover .dropdown-menu {
          display: flex !important;
        }
        .dropdown-item {
          padding: 10px 20px;
          font-size: 0.9rem;
          color: var(--text-secondary);
          transition: var(--transition);
        }
        .dropdown-item:hover {
          background: rgba(99, 102, 241, 0.1);
          color: var(--text-primary);
        }
        @media (max-width: 900px) {
          .desktop-menu, .desktop-search, .desktop-user {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
