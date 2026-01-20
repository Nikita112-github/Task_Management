'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { setTokens } from '@/lib/auth';
import toast, { Toaster } from 'react-hot-toast';
import { Mail, Lock, User, UserPlus, Sparkles } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        formData
      );

      setTokens(response.data.accessToken, response.data.refreshToken);
      toast.success('Account created successfully!');
      setTimeout(() => router.push('/dashboard'), 1000);
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Toaster position="top-right" />
      
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden md:flex flex-col justify-center space-y-6 p-8">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-purple-600 to-blue-600 rounded-2xl shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Start your journey
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-blue-600">
                to productivity
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Join thousands of users managing their tasks efficiently
            </p>
          </div>

          <div className="space-y-4 pt-8">
            <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-100 to-blue-100 flex items-center justify-center shrink-0">
                <span className="text-2xl">🚀</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Quick Setup</h3>
                <p className="text-gray-600 text-sm">Get started in under 60 seconds</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center shrink-0">
                <span className="text-2xl">🔒</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Secure & Private</h3>
                <p className="text-gray-600 text-sm">Your data is encrypted and protected</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-100 to-pink-100 flex items-center justify-center shrink-0">
                <span className="text-2xl">✨</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Free Forever</h3>
                <p className="text-gray-600 text-sm">No credit card required</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Create your account
              </h2>
              <p className="text-gray-600">
                Start organizing your tasks today
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              </div>

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
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
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
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Must be at least 6 characters long
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Creating your account...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Create Account
                  </>
                )}
              </button>
            </form>

            {/* Terms */}
            <p className="mt-6 text-center text-xs text-gray-500">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  Sign in instead
                </Link>
              </p>
            </div>
          </div>

          {/* Mobile Branding */}
          <div className="md:hidden mt-8 text-center space-y-2">
            <p className="text-gray-600 text-sm font-medium">
              ⭐ Trusted by 10,000+ users
            </p>
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-yellow-400 text-lg">★</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}