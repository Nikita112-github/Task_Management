'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { setTokens } from '@/lib/auth';
import toast, { Toaster } from 'react-hot-toast';
import { Mail, Lock, LogIn, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        formData
      );

      setTokens(response.data.accessToken, response.data.refreshToken);
      toast.success('Login successful!');
      setTimeout(() => router.push('/dashboard'), 1000);
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Toaster position="top-right" />
      
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden md:flex flex-col justify-center space-y-6 p-8">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Welcome back to
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                TaskMaster
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Organize your life, one task at a time
            </p>
          </div>

          <div className="space-y-4 pt-8">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-1">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Stay Organized</h3>
                <p className="text-gray-600 text-sm">Keep track of all your tasks in one place</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-1">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Boost Productivity</h3>
                <p className="text-gray-600 text-sm">Complete tasks faster with our intuitive interface</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center shrink-0 mt-1">
                <CheckCircle2 className="w-4 h-4 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Never Miss a Deadline</h3>
                <p className="text-gray-600 text-sm">Stay on top of your priorities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Sign in to your account
              </h2>
              <p className="text-gray-600">
                Enter your credentials to access your tasks
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Sign in
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link
                  href="/register"
                  className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>

          {/* Mobile Branding */}
          <div className="md:hidden mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Trusted by thousands of productive individuals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}