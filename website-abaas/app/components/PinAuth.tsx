'use client';

import { useState, useEffect } from 'react';

interface PinAuthProps {
  onAuthenticated: () => void;
}

export default function PinAuth({ onAuthenticated }: PinAuthProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already authenticated
    const isAuth = sessionStorage.getItem('isAuthenticated');
    if (isAuth === 'true') {
      onAuthenticated();
    }
  }, [onAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (pin.length !== 6) {
      setError('PIN must be 6 digits');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/verify-pin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pin }),
      });

      const result = await response.json();

      if (result.success) {
        sessionStorage.setItem('isAuthenticated', 'true');
        onAuthenticated();
      } else {
        setError('Invalid PIN. Please try again.');
        setPin('');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only digits
    if (value.length <= 6) {
      setPin(value);
      setError('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F1EFCE] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl border-2 border-[#CCB256] max-w-md w-full p-8">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img
              src="/logo.png"
              alt="AB AAS Logo"
              className="h-20 w-20 object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-[#C03825] handwritten mb-2">
            || AB AAS ||
          </h1>
          <p className="text-sm font-semibold text-[#C03825]">
            अखिल भारतीय अष्टावक्र अद्वैत संस्थान
          </p>
        </div>

        {/* Lock Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#F1EFCE] rounded-full p-4 border-2 border-[#CCB256]">
            <svg 
              className="h-12 w-12 text-[#C03825]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-[#C03825] mb-2">
            Admin Access Required
          </h2>
          <p className="text-sm text-gray-600">
            Enter your 6-digit PIN to access the dashboard
          </p>
        </div>

        {/* PIN Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#C03825] mb-2">
              Enter PIN
            </label>
            <input
              type="password"
              inputMode="numeric"
              value={pin}
              onChange={handlePinChange}
              placeholder="••••••"
              className="w-full px-4 py-3 text-center text-2xl tracking-widest border-2 border-[#CCB256] rounded-lg focus:ring-2 focus:ring-[#CCB256] focus:border-[#CCB256] font-mono"
              maxLength={6}
              autoFocus
              disabled={loading}
            />
            
            
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-3 flex items-center gap-2">
              <svg 
                className="h-5 w-5 text-red-600 flex-shrink-0" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                  clipRule="evenodd" 
                />
              </svg>
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || pin.length !== 6}
            className="w-full py-3 bg-[#C03825] text-white rounded-lg hover:bg-[#a02f1f] font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Verifying...
              </>
            ) : (
              <>
                <svg 
                  className="h-5 w-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" 
                  />
                </svg>
                Unlock Dashboard
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
