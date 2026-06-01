import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="glass" style={{
      borderTop: '1px solid var(--glass-border)',
      padding: '60px 0 30px',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '40px',
          justifyContent: 'space-between',
          marginBottom: '50px'
        }}>
          {/* Brand Info */}
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 800 }} className="gradient-text">E-CART</span>
              <span style={{ fontSize: '1.2rem' }}>🛍️</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px', lineHeight: 1.6 }}>
              Crafting premium shopping experiences with state-of-the-art aesthetics and hyper-convenient digital systems. Grab the future of commerce now.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="#" className="social-icon">FB</a>
              <a href="#" className="social-icon">TW</a>
              <a href="#" className="social-icon">IG</a>
              <a href="#" className="social-icon">LI</a>
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ flex: '1 1 150px' }}>
            <h4 style={{ fontWeight: 700, marginBottom: '20px', fontSize: '1.1rem' }}>Shop Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/products" className="footer-link">All Products</Link></li>
              <li><Link to="/products?category=Electronics" className="footer-link">Electronics</Link></li>
              <li><Link to="/products?category=Fashion" className="footer-link">Fashion</Link></li>
            </ul>
          </div>

          {/* Info Links */}
          <div style={{ flex: '1 1 150px' }}>
            <h4 style={{ fontWeight: 700, marginBottom: '20px', fontSize: '1.1rem' }}>Support</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <li><a href="#" className="footer-link">About Us</a></li>
              <li><a href="#" className="footer-link">Contact Us</a></li>
              <li><a href="#" className="footer-link">Privacy Policy</a></li>
              <li><a href="#" className="footer-link">FAQs</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div style={{ flex: '1 1 300px' }}>
            <h4 style={{ fontWeight: 700, marginBottom: '20px', fontSize: '1.1rem' }}>Join the Club</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px' }}>
              Subscribe to get exclusive alerts, drop drops, and special seasonal vouchers!
            </p>
            {subscribed ? (
              <div className="glass" style={{
                padding: '12px',
                borderRadius: '8px',
                borderColor: 'var(--success)',
                color: 'var(--success)',
                fontWeight: 600,
                fontSize: '0.85rem',
                textAlign: 'center'
              }}>
                🎉 Thank you for subscribing! Check your inbox.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  placeholder="name@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  style={{
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    padding: '10px 14px'
                  }}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '0 16px', borderRadius: '8px', fontSize: '0.85rem' }}>
                  Join
                </button>
              </form>
            )}
            <div style={{ marginTop: '24px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <p>📍 100 Commerce Ave, San Francisco, CA</p>
              <p style={{ marginTop: '4px' }}>📞 +1 (800) 555-0199</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div style={{
          borderTop: '1px solid var(--glass-border)',
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          gap: '16px'
        }}>
          <p>© {new Date().getFullYear()} E-CART Inc. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="#" className="footer-link">Sitemap</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link {
          transition: var(--transition);
        }
        .footer-link:hover {
          color: var(--text-primary);
          padding-left: 2px;
        }
        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          font-weight: 700;
          font-size: 0.75rem;
          transition: var(--transition);
          color: var(--text-secondary);
        }
        .social-icon:hover {
          background: var(--primary);
          color: white;
          transform: translateY(-2px);
          border-color: var(--primary);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
