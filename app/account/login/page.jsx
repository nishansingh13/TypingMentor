"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Keyboard, Mail, Lock, User, ArrowRight, ChevronRight, Eye, EyeOff } from 'lucide-react';
import Navbar from '../../component/Navbar';
import axios from 'axios';
import { useAppContext } from '@/app/context/ContextProvider';
import { toast, Toaster } from 'sonner';

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const {formData, setFormData} = useAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);
    if (isLogin) {
      
      const response = await axios.post('/api/users/login', {
        email: formData.email,
        password: formData.password
      });
      if (response.status === 200) {
        window.location.href ='/';
        toast.success("Login successful!");
       
       
      }
    } else {
    
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match!');
        return;
      }
      const response = await axios.post('/api/users/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      if (response.status === 200) {
        toast.success('Sign up successful! Please log in.');
        setIsLogin(true);
     
        setFormData({
          email: '',
          password: '',
          username: '',
          confirmPassword: ''
        });
      }
    }
  } catch (error) {
    setLoading(false);
    console.error('Error during authentication:', error);
    if (error.response && error.response.data) {
      toast.error(error.response.data.error || 'An error occurred. Please try again.');
    } else {
      toast.error('An unexpected error occurred. Please try again later.');
    }
  }
  finally {
    setLoading(false);
  }
};
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};

const toggleConfirmPasswordVisibility = () => {
  setShowConfirmPassword(!showConfirmPassword);
};

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center">
      <Navbar />
      <Toaster position="top-right" richColors/>
      
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center flex-1">
        <div className="w-full max-w-md">
          {/* Logo and Heading */}
      
          
          {/* Auth Card */}
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 shadow-lg">
            {/* Tab Switcher */}
            <div className="flex mb-6 border-b border-gray-700">
              <button 
                className={`pb-3 px-4 font-medium ${isLogin ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-gray-400 hover:text-gray-200'}`}
                onClick={() => setIsLogin(true)}
              >
                Log In
              </button>
              <button 
                className={`pb-3 px-4 font-medium ${!isLogin ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-gray-400 hover:text-gray-200'}`}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </div>
            
            {isLogin ? (
              /* Login Form */
              <form className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 block">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-500" />
                    </div>
                    <input 
                      onChange={handleChange}
                      name="email"
                      type="email" 
                      value={formData.email}
                      className="bg-gray-700 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 p-2.5" 
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 block">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-500" />
                    </div>
                    <input 
                      value={formData.password}
                      type={showPassword ? "text" : "password"} 
                      onChange={handleChange}
                      name="password"
                      className="bg-gray-700 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 pr-10 p-2.5" 
                      placeholder="••••••••"
                    />
                    <button 
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? 
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-200" /> : 
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-200" />
                      }
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input 
                    value={formData.rememberMe || false}
                      onChange={handleChange}
                      name="rememberMe"
                      type="checkbox" 
                      className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-emerald-500 text-emerald-500"
                    />
                    <label className="ml-2 text-sm text-gray-300">Remember me</label>
                  </div>
                  <a href="#" className="text-sm text-emerald-400 hover:underline">Forgot password?</a>
                </div>
                {loading ? (
            <>
              <button disabled className="animate-pulse w-full bg-emerald-800 text-white font-medium rounded-lg text-sm px-5 py-3 transition-colors flex items-center justify-center">Logging in...</button>
            </>
          ) : (
            <>
                <button 
                  type="submit" 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg text-sm px-5 py-3 transition-colors flex items-center justify-center"
                  onClick={handleSubmit}
                >
                  <span>Sign In</span>
                  <ChevronRight className="ml-2 h-4 w-4" />
                </button>
            </>
          )}
              
              </form>
            ) : (
              /* Sign Up Form */
              <form className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 block">Username</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <input 
                      type="text" 
                      value={formData.username}
                      onChange={handleChange}
                      name="username"
                      className="bg-gray-700 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 p-2.5" 
                      placeholder="username"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 block">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-500" />
                    </div>
                    <input 
                      value={formData.email}
                      onChange={handleChange}
                      name="email"
                      type="email" 
                      className="bg-gray-700 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 p-2.5" 
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 block">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-500" />
                    </div>
                    <input 
                    value={formData.password}
                      onChange={handleChange}
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="bg-gray-700 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 pr-10 p-2.5" 
                      placeholder="••••••••"
                    />
                    <button 
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? 
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-200" /> : 
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-200" />
                      }
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 block">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-500" />
                    </div>
                    <input 
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className="bg-gray-700 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 pr-10 p-2.5" 
                      placeholder="••••••••"
                    />
                    <button 
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? 
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-200" /> : 
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-200" />
                      }
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-emerald-500 text-emerald-500"
                  />
                  <label className="ml-2 text-sm text-gray-300">I agree to the <a href="#" className="text-emerald-400 hover:underline">Terms and Conditions</a></label>
                </div>
                {loading ? (
            <>
              <button disabled className="animate-pulse w-full bg-emerald-800 text-white font-medium rounded-lg text-sm px-5 py-3 transition-colors flex items-center justify-center">Creating your account...</button>
            </>
          ) :(<button 
            type="submit" 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg text-sm px-5 py-3 transition-colors flex items-center justify-center"
            onClick={handleSubmit}
          >
            <span>Create Account</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>)}
                
              </form>
            )}
            
            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-gray-700"></div>
              <span className="px-3 text-sm text-gray-500">OR</span>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>
            
            {/* Social Login */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg text-sm px-5 py-3 transition-colors">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
              
              <button className="w-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg text-sm px-5 py-3 transition-colors">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
                Continue with Facebook
              </button>
            </div>
            
            {/* Footer Text */}
            <p className="text-sm text-center text-gray-500 mt-6">
              {isLogin ? "Don't have an account?" : "Already have an account?"} 
              <button 
                className="text-emerald-400 hover:underline ml-1"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>
          
          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>Press Tab+Enter to navigate back to home</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
