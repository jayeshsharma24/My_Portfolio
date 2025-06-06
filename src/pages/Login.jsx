import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const API_BASE = 'http://localhost:3000/api/auth';

const Login = () => {
  const [view, setView] = useState('login'); // login | signup | forgot | otp | reset
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // To keep track of forgot or signup OTP purpose
  const [otpFor, setOtpFor] = useState(null); // 'signup' or 'forgot'

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, []);
  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setOtp('');
    setMessage('');
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      if (view === 'signup') {
        if (password !== confirmPassword) {
          setMessage('Passwords do not match');
          setLoading(false);
          return;
        }
        // Signup API call - sends OTP email
        const res = await fetch(`${API_BASE}/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (res.ok) {
          setMessage(data.msg);
          setOtpFor('signup');
          setView('otp'); // go to OTP screen after signup request
        } else {
          setMessage(data.msg || 'Signup failed');
        }
      } else if (view === 'otp') {
        // OTP verification API call (for signup or forgot)
        const res = await fetch(`${API_BASE}/verify-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp, otpFor }),
        });
        const data = await res.json();
        if (res.ok) {
          setMessage(data.msg);
          if (otpFor === 'signup') {
            resetForm();
            setView('login'); // After signup OTP verified, go to login
          } else if (otpFor === 'forgot') {
            setView('reset'); // After forgot OTP verified, go to reset password
          }
        } else {
          setMessage(data.msg || 'OTP verification failed');
        }
      } else if (view === 'login') {
        // Login API call
        const res = await fetch(`${API_BASE}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.ok) {
          setMessage('Login successful!');
          localStorage.setItem('token', data.token);
          navigate('/home');
        } else {
          setMessage(data.msg || 'Login failed');
        }
      } else if (view === 'forgot') {
        // Send OTP for forgot password
        const res = await fetch(`${API_BASE}/forgot-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (res.ok) {
          setMessage(data.msg);
          setOtpFor('forgot');
          setView('otp');
        } else {
          setMessage(data.msg || 'Failed to send OTP');
        }
      } else if (view === 'reset') {
        if (password !== confirmPassword) {
          setMessage('Passwords do not match');
          setLoading(false);
          return;
        }
        // Reset password API call
        const res = await fetch(`${API_BASE}/reset-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.ok) {
          setMessage(data.msg);
          resetForm();
          setView('login');
        } else {
          setMessage(data.msg || 'Password reset failed');
        }
      }
    } catch (error) {
      setMessage('Server error');
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-purple-200 px-4 animate-fade-in">
    <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl grid grid-cols-1 md:grid-cols-2 overflow-hidden transform transition duration-500 hover:scale-[1.01]">
      <div className="hidden md:block bg-[url('/login.jpg')] bg-cover bg-center relative">
        <div className="absolute inset-0  bg-opacity-30"></div>
      </div>

      <div className="p-8 flex flex-col justify-center animate-slide-up">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-3 tracking-wide">
          Jayesh's Portfolio Website
        </h1>

        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          {{
            login: 'Login to Your Account',
            signup: 'Create a New Account',
            forgot: 'Recover Your Password',
            otp: 'Verify OTP',
            reset: 'Set New Password',
          }[view]}
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {view === 'signup' && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="animated-input"
              required
            />
          )}

          {(view === 'login' || view === 'signup' || view === 'forgot') && (
            <input
              type="email"
              placeholder="Email or User ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="animated-input"
              required
            />
          )}

          {(view === 'login' || view === 'signup' || view === 'reset') && (
            <input
              type="password"
              placeholder={view === 'reset' ? 'New Password' : 'Password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="animated-input"
              required
            />
          )}

          {(view === 'signup' || view === 'reset') && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="animated-input"
              required
            />
          )}

          {view === 'otp' && (
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="animated-input"
              required
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-semibold py-2 rounded-lg transition duration-300 shadow-md`}
          >
            {{
              login: 'Login',
              signup: 'Create Account',
              forgot: 'Send OTP',
              otp: 'Verify OTP',
              reset: 'Reset Password',
            }[view]}
          </button>
        </form>

        {message && (
          <p className="text-center text-red-500 mt-2 font-medium animate-pulse">
            {message}
          </p>
        )}

        {/* Navigation links */}
        <div className="text-sm text-center mt-6 text-gray-700 space-y-2">
          {view === 'login' && (
            <>
              <p>
                Forgot your password?{' '}
                <button
                  onClick={() => {
                    setMessage('');
                    setView('forgot');
                  }}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Click here
                </button>
              </p>
              <p>
                Don't have an account?{' '}
                <button
                  onClick={() => {
                    setMessage('');
                    setView('signup');
                  }}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Sign Up
                </button>
              </p>
            </>
          )}

          {view === 'signup' && (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => {
                  setMessage('');
                  setView('login');
                }}
                className="text-blue-600 hover:underline font-medium"
              >
                Login
              </button>
            </p>
          )}

          {(view === 'forgot' || view === 'otp' || view === 'reset') && (
            <p>
              Back to{' '}
              <button
                onClick={() => {
                  setMessage('');
                  setView('login');
                }}
                className="text-blue-600 hover:underline font-medium"
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};

export default Login;
