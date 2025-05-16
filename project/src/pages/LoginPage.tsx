import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Building2, Mail, Lock, UserCheck } from 'lucide-react';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const { login, loginWithDemo } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setError('');
    setIsDemoLoading(true);

    try {
      await loginWithDemo();
      navigate('/dashboard');
    } catch (err: any) {
      setError('Demo login failed. Please try again.');
    } finally {
      setIsDemoLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="flex justify-center">
            <Building2 className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your Moldova Insight Realty dashboard
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <Mail className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-t-md relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <Lock className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-b-md relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <LoadingSpinner size="small" color="white" className="mr-2" />
                  Signing in...
                </span>
              ) : 'Sign in'}
            </button>

            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isDemoLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-blue-300 text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
            >
              {isDemoLoading ? (
                <span className="flex items-center">
                  <LoadingSpinner size="small" color="primary" className="mr-2" />
                  Loading demo...
                </span>
              ) : (
                <span className="flex items-center">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Login with Demo Account
                </span>
              )}
            </button>
          </div>
          
          <div className="text-center text-sm mt-2">
            <p className="text-gray-600">
              Demo credentials: <strong>demo@example.com / password123</strong>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
