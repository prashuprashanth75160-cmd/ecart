import React from 'react';
import { Link } from 'react-router-dom';
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';

const Home = () => {
  // Take first 3 products as featured
  const featuredProducts = productsData.slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        padding: '100px 0 120px',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)'
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          alignItems: 'center',
          gap: '50px'
        }}>
          {/* Hero Left Content */}
          <div className="animate-slide-up">
            <span className="badge badge-secondary" style={{ marginBottom: '16px', color: 'var(--primary)', borderColor: 'rgba(99, 102, 241, 0.3)', background: 'rgba(99, 102, 241, 0.05)' }}>
              ⚡ EXCLUSIVE COLLECTION 2026
            </span>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: '20px',
              letterSpacing: '-1px'
            }}>
              Step Into The <br/>
              <span className="gradient-text">Future of Commerce</span>
            </h1>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1.1rem',
              marginBottom: '32px',
              lineHeight: 1.6,
              maxWidth: '520px'
            }}>
              Discover curated premium tech, modern accessories, and streetwear designed to elevate your lifestyle. Crafted with perfection, styled for tomorrow.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <Link to="/products" className="btn btn-primary" style={{ fontSize: '1.05rem', padding: '14px 32px' }}>
                Shop Collection Now
              </Link>
              <Link to="/products?category=Electronics" className="btn btn-secondary" style={{ fontSize: '1.05rem', padding: '14px 32px' }}>
                Browse Tech
              </Link>
            </div>
          </div>

          {/* Hero Right Image / Glass Card */}
          <div className="animate-scale-in" style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            {/* Ambient background glow */}
            <div style={{
              position: 'absolute',
              width: '320px',
              height: '320px',
              background: 'var(--primary)',
              borderRadius: '50%',
              filter: 'blur(80px)',
              opacity: 0.3,
              zIndex: -1
            }} />
            
            <div className="glass-card" style={{
              width: '100%',
              maxWidth: '420px',
              padding: '24px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-glow)',
              position: 'relative'
            }}>
              <span className="badge badge-primary" style={{ position: 'absolute', top: '16px', left: '16px' }}>HOT DEAL</span>
              <img
                src="/products/headphones.png"
                alt="Featured Headphones"
                style={{
                  width: '100%',
                  maxHeight: '260px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.5))',
                  marginBottom: '20px',
                  animation: 'float 4s ease-in-out infinite'
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60';
                }}
              />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '6px' }}>NovaSound ANC Wireless</h3>
              <p style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1.2rem', marginBottom: '16px' }}>$199.99 <span style={{ textDecoration: 'line-through', fontSize: '0.9rem', color: 'var(--text-muted)' }}>$249.99</span></p>
              <Link to="/product/1" className="btn btn-primary" style={{ width: '100%', borderRadius: '10px' }}>
                View Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section style={{ padding: '60px 0', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.01)' }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '30px'
        }}>
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '2rem' }}>🚚</span>
            <h4 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Free Fast Shipping</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Complimentary standard courier delivery on all retail orders over $150.</p>
          </div>
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '2rem' }}>🔒</span>
            <h4 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Secure Payments</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Fully encrypted SSL checkouts with modern credit card, PayPal, and Apple Pay integrations.</p>
          </div>
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '2rem' }}>⚡</span>
            <h4 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Elite Performance</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Direct warranties and dedicated product backing with immediate customer service.</p>
          </div>
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '2rem' }}>💬</span>
            <h4 style={{ fontWeight: 700, fontSize: '1.1rem' }}>24/7 Premium Help</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Live customer support agents always on standby to resolve order issues.</p>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '48px'
          }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '1px', textTransform: 'uppercase' }}>Selected Collection</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '4px' }}>Featured Releases</h2>
            </div>
            <Link to="/products" className="btn btn-secondary" style={{ fontSize: '0.9rem', padding: '10px 20px' }}>
              Browse All
            </Link>
          </div>

          <div className="product-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Category Spotlight Promo Banner */}
      <section style={{ paddingBottom: '100px' }}>
        <div className="container">
          <div className="glass-card gradient-bg" style={{
            padding: '60px 40px',
            borderRadius: '24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            alignItems: 'center',
            gap: '40px',
            color: 'white',
            boxShadow: 'var(--shadow)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background design accents */}
            <div style={{
              position: 'absolute',
              right: '-10%',
              top: '-10%',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
              zIndex: 0
            }} />
            
            <div style={{ zIndex: 1 }} className="animate-slide-up">
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '16px' }}>
                Join the E-Cart Elite Club
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.85)', marginBottom: '30px', maxWidth: '480px' }}>
                Create a free store profile now to claim a standard **10% DISCOUNT code** (DISCOUNT10) and save products to your personal premium wishlist drawer.
              </p>
              <Link to="/register" className="btn" style={{ background: 'white', color: 'var(--primary)', fontWeight: 700, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                Sign Up For Free
              </Link>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              zIndex: 1
            }}>
              <img
                src="/products/watch.png"
                alt="Chronos Smartwatch"
                style={{
                  maxHeight: '280px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0px 15px 30px rgba(0,0,0,0.4))'
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=500&auto=format&fit=crop&q=60';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Floating animation definition */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
};

export default Home;
