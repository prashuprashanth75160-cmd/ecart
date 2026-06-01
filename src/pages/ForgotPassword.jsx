import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();

  // Form states
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const msg = await forgotPassword(email);
      setLoading(false);
      setSuccess(msg);
      setEmail('');
    } catch (err) {
      setLoading(false);
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container animate-fade-in" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 200px)',
      paddingTop: '40px'
    }}>
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '440px',
        padding: '40px',
        boxShadow: 'var(--shadow)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Reset Password</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '6px' }}>
            We'll send you secure instructions to recover access.
          </p>
        </div>

        {error && (
          <div className="glass" style={{
            padding: '12px',
            borderRadius: '8px',
            borderColor: 'var(--danger)',
            color: 'var(--danger)',
            fontWeight: 500,
            fontSize: '0.85rem',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            ⚠️ {error}
          </div>
        )}

        {success && (
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
            🎉 {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              required
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px', marginTop: '8px' }}
            disabled={loading}
          >
            {loading ? "Sending security token..." : "Send Reset Instructions"}
          </button>
        </form>

        {/* Footer link */}
        <p style={{
          textAlign: 'center',
          color: 'var(--text-secondary)',
          fontSize: '0.85rem',
          marginTop: '24px',
          borderTop: '1px solid var(--glass-border)',
          paddingTop: '20px'
        }}>
          Remember your password?{' '}
          <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 700 }}>
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
