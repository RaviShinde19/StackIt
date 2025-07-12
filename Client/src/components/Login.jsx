import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const response = await apiService.login(formData);
      
      // Login successful
      setIsLoading(false);
      navigate('/dashboard');
      
    } catch (error) {
      setIsLoading(false);
      setErrors({ submit: error.message || 'Login failed. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 p-5">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-slide-up">
        <div className="text-center mb-8">
          <h2 className="text-gray-900 text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-600">Please sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg text-base transition-all duration-300 bg-gray-50 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 ${
                errors.email ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200' : 'border-gray-200'
              }`}
              placeholder="Enter your email"
              required
            />
            {errors.email && <span className="text-red-500 text-sm mt-1 block font-medium">{errors.email}</span>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg text-base transition-all duration-300 bg-gray-50 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 ${
                errors.password ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200' : 'border-gray-200'
              }`}
              placeholder="Enter your password"
              required
            />
            {errors.password && <span className="text-red-500 text-sm mt-1 block font-medium">{errors.password}</span>}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="w-4 h-4 mr-2 cursor-pointer" />
              <span className="text-sm text-gray-700">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-purple-600 hover:text-purple-800 font-medium hover:underline">
              Forgot password?
            </Link>
          </div>

          {errors.submit && <div className="text-red-500 text-sm font-medium">{errors.submit}</div>}

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg text-base font-semibold transition-all duration-300 hover:from-purple-700 hover:to-blue-700 hover:shadow-lg hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none relative"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="opacity-0">Signing in...</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-purple-600 hover:text-purple-800 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
