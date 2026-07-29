import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Utils/AuthContext';
import { toast } from 'react-toastify';

const AuthModal = () => {
  const navigate = useNavigate();
  const { authModalOpen, closeAuthModal, authMode, setAuthMode, signIn, signUp } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!authModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (authMode === 'login') {
        await signIn({ email, password });
        toast.success('Logged in successfully!');
      } else {
        await signUp({ email, password, fullName });
        toast.success('Account created & logged in successfully!');
      }
      closeAuthModal();
      setEmail('');
      setPassword('');
      setFullName('');
      navigate('/');
    } catch (err) {
      const msg = err.message || '';
      if (msg.includes('Email logins are disabled') || msg.includes('email_provider_disabled')) {
        setErrorMsg('Email Provider is currently turned OFF in your Supabase project. Go to Supabase Dashboard -> Authentication -> Providers -> Email and turn ON "Enable Email provider".');
      } else if (msg.includes('over_email_send_rate_limit')) {
        setErrorMsg('Email rate limit reached. In Supabase Dashboard -> Authentication -> Providers -> Email, turn OFF "Confirm Email".');
      } else {
        setErrorMsg(msg || 'An error occurred during authentication.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-md bg-[#1f1e24] border border-zinc-700/50 rounded-2xl p-6 shadow-2xl text-white">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white hover:bg-zinc-800 p-1.5 rounded-full transition-colors cursor-pointer"
        >
          <i className="ri-close-line text-2xl"></i>
        </button>

        {/* Header Logo & Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
            <i className="ri-movie-ai-fill text-[#6556cd]"></i>
            <span>CinePlay</span>
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            {authMode === 'login' ? 'Welcome back! Log in to your account' : 'Create an account to get started'}
          </p>
        </div>

        {/* Auth Mode Toggle Tabs */}
        <div className="flex bg-zinc-800/60 p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => {
              setAuthMode('login');
              setErrorMsg('');
            }}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              authMode === 'login'
                ? 'bg-[#6556cd] text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('signup');
              setErrorMsg('');
            }}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              authMode === 'signup'
                ? 'bg-[#6556cd] text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs flex items-center gap-2">
            <i className="ri-error-warning-line text-base"></i>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {authMode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Full Name</label>
              <div className="relative flex items-center">
                <i className="ri-user-3-line absolute left-3 text-zinc-400 text-lg"></i>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-zinc-800/80 border border-zinc-700/60 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#6556cd] transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Email Address</label>
            <div className="relative flex items-center">
              <i className="ri-mail-line absolute left-3 text-zinc-400 text-lg"></i>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-800/80 border border-zinc-700/60 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#6556cd] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Password</label>
            <div className="relative flex items-center">
              <i className="ri-lock-line absolute left-3 text-zinc-400 text-lg"></i>
              <input
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-800/80 border border-zinc-700/60 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#6556cd] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-3 bg-[#6556cd] hover:bg-[#5344be] text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-[#6556cd]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            {loading ? (
              <>
                <i className="ri-loader-4-line animate-spin text-lg"></i>
                <span>{authMode === 'login' ? 'Logging in...' : 'Creating Account...'}</span>
              </>
            ) : (
              <span>{authMode === 'login' ? 'Log In' : 'Sign Up'}</span>
            )}
          </button>
        </form>

        {/* Footer Note */}
        <p className="text-center text-xs text-zinc-500 mt-5">
          By continuing, you agree to CinePlay's Terms of Service & Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
