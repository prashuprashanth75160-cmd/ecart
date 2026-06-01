import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { TrashIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const Cart = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    getSubtotal,
    getTax,
    getShipping,
    getTotal,
    clearCart
  } = useCart();

  // Local state
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'processing', 'completed'

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    if (promoCode.trim().toUpperCase() === 'DISCOUNT10') {
      setDiscountPercent(10);
      setPromoSuccess('Promo applied! Enjoy 10% off your subtotal.');
    } else if (promoCode.trim()) {
      setPromoError('Invalid promo code. Try "DISCOUNT10".');
    }
  };

  const handleCheckout = () => {
    setCheckoutStep('processing');
    
    // Simulate payment transaction
    setTimeout(() => {
      setCheckoutStep('completed');
      clearCart();
      setDiscountPercent(0);
      setPromoCode('');
      setPromoSuccess('');
    }, 2000);
  };

  // Calculations
  const rawSubtotal = getSubtotal();
  const discountAmount = rawSubtotal * (discountPercent / 100);
  const adjustedSubtotal = rawSubtotal - discountAmount;
  const tax = adjustedSubtotal * 0.08;
  const shipping = getShipping();
  const grandTotal = adjustedSubtotal + tax + shipping;

  if (checkoutStep === 'processing') {
    return (
      <div className="container state-container">
        <div className="loader" style={{ width: '60px', height: '60px', borderWidth: '5px' }}></div>
        <h2 className="state-title">Encrypting Checkout Session</h2>
        <p className="state-desc">Connecting to safe banking portal and authorizing secure checkout transaction...</p>
      </div>
    );
  }

  if (checkoutStep === 'completed') {
    return (
      <div className="container state-container">
        <CheckCircleIcon style={{ width: '72px', height: '72px', color: 'var(--success)', animation: 'scaleIn 0.5s ease' }} />
        <h2 className="state-title">Order Placed Successfully!</h2>
        <p className="state-desc" style={{ maxWidth: '440px' }}>
          Thank you for shopping with E-Cart. Your payment transaction completed, and a confirmation receipt has been dispatched to your email address.
        </p>
        <Link to="/products" className="btn btn-primary" style={{ padding: '12px 32px' }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container state-container">
        <span style={{ fontSize: '4rem', filter: 'drop-shadow(0px 8px 16px rgba(99,102,241,0.2))' }}>🛒</span>
        <h2 className="state-title">Your Cart is Empty</h2>
        <p className="state-desc">Looks like you haven't added any products to your cart yet. Explore our curated collections to find your fits.</p>
        <Link to="/products" className="btn btn-primary" style={{ padding: '12px 32px' }}>
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in">
      <header style={{ marginBottom: '40px', marginTop: '20px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Shopping Cart</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Review your products and customize quantities before checking out.</p>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 380px',
        gap: '40px',
        alignItems: 'start'
      }} className="cart-layout">
        
        {/* Cart Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {cart.map((item) => (
            <div key={item.id} className="glass-card cart-item" style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px 24px',
              gap: '20px',
              flexWrap: 'wrap'
            }}>
              {/* Product Thumbnail */}
              <Link to={`/product/${item.id}`} style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200';
                  }}
                />
              </Link>

              {/* Title & Price info */}
              <div style={{ flexGrow: 1, minWidth: '200px' }}>
                <Link to={`/product/${item.id}`}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'white' }}>{item.name}</h3>
                </Link>
                <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}>{item.category}</span>
                <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-secondary)', marginTop: '4px' }}>
                  ${item.price.toFixed(2)} each
                </p>
              </div>

              {/* Quantity Changer */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                border: '1px solid var(--glass-border)',
                borderRadius: '8px',
                padding: '2px',
                background: 'rgba(255,255,255,0.01)'
              }}>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}
                >
                  -
                </button>
                <span style={{ width: '32px', textAlign: 'center', fontWeight: 700, fontSize: '0.9rem' }}>
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}
                >
                  +
                </button>
              </div>

              {/* Subtotal Item Cost */}
              <div style={{ minWidth: '100px', textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Subtotal</span>
                <p style={{ fontSize: '1.15rem', fontWeight: 800, color: 'white' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* Remove Trash trigger */}
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(239, 68, 68, 0.05)',
                  border: '1px solid rgba(239, 68, 68, 0.1)',
                  color: 'var(--danger)',
                  transition: 'var(--transition)'
                }}
                className="trash-btn"
                title="Remove item"
              >
                <TrashIcon style={{ width: '18px', height: '18px' }} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary Panel */}
        <aside className="glass" style={{
          padding: '24px',
          borderRadius: '16px',
          border: '1px solid var(--glass-border)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          <h3 style={{ fontWeight: 700, fontSize: '1.2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
            Order Summary
          </h3>

          {/* Pricing list breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Items Subtotal</span>
              <span style={{ color: 'white', fontWeight: 600 }}>${rawSubtotal.toFixed(2)}</span>
            </div>
            
            {discountPercent > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)' }}>
                <span>Club discount ({discountPercent}%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Estimated Sales Tax (8%)</span>
              <span style={{ color: 'white', fontWeight: 600 }}>${tax.toFixed(2)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Shipping Cost</span>
              <span style={{ color: 'white', fontWeight: 600 }}>
                {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            {shipping > 0 && (
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'right' }}>
                Add ${(150 - rawSubtotal).toFixed(2)} more for free shipping!
              </p>
            )}

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '1.25rem',
              fontWeight: 800,
              color: 'white',
              borderTop: '1px dashed var(--glass-border)',
              paddingTop: '16px',
              marginTop: '8px'
            }}>
              <span>Total Price</span>
              <span className="gradient-text">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Promo code entry */}
          <form onSubmit={handleApplyPromo} style={{
            borderTop: '1px solid var(--glass-border)',
            paddingTop: '20px'
          }}>
            <span className="form-label" style={{ marginBottom: '8px', display: 'block' }}>Have a Promo Code?</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="DISCOUNT10"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="form-input"
                style={{ padding: '8px 12px', fontSize: '0.85rem' }}
              />
              <button type="submit" className="btn btn-secondary" style={{ padding: '0 16px', fontSize: '0.85rem' }}>
                Apply
              </button>
            </div>
            {promoError && <p style={{ fontSize: '0.75rem', color: 'var(--danger)', marginTop: '6px' }}>{promoError}</p>}
            {promoSuccess && <p style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: '6px' }}>{promoSuccess}</p>}
          </form>

          {/* Checkout button */}
          <button
            onClick={handleCheckout}
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px 24px', fontSize: '1rem', borderRadius: '12px' }}
          >
            Authorize Secure Checkout
          </button>
        </aside>

      </div>

      <style>{`
        .trash-btn:hover {
          background: rgba(239, 68, 68, 0.15) !important;
          border-color: rgba(239, 68, 68, 0.3) !important;
          transform: scale(1.05);
        }
        @media (max-width: 900px) {
          .cart-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Cart;
