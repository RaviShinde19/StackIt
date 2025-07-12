import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (formData.phoneNumber && !/^\+?[\d\s-()]{10,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber || null,
      };
      
      await apiService.register(userData);
      
      setIsLoading(false);
      // Redirect to login page with success message
      navigate('/login', { 
        state: { message: 'Registration successful! Please sign in.' }
      });
      
    } catch (error) {
      setIsLoading(false);
      setErrors({ submit: error.message || 'Registration failed. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 p-5">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 animate-slide-up">
        <div className="text-center mb-8">
          <h2 className="text-gray-900 text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-gray-600">Join us today and get started</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg text-base transition-all duration-300 bg-gray-50 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 ${
                  errors.firstName ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200' : 'border-gray-200'
                }`}
                placeholder="Enter your first name"
                required
              />
              {errors.firstName && <span className="text-red-500 text-sm mt-1 block font-medium">{errors.firstName}</span>}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg text-base transition-all duration-300 bg-gray-50 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 ${
                  errors.lastName ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200' : 'border-gray-200'
                }`}
                placeholder="Enter your last name"
                required
              />
              {errors.lastName && <span className="text-red-500 text-sm mt-1 block font-medium">{errors.lastName}</span>}
            </div>
          </div>

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
            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg text-base transition-all duration-300 bg-gray-50 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 ${
                errors.phoneNumber ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200' : 'border-gray-200'
              }`}
              placeholder="Enter your phone number"
            />
            {errors.phoneNumber && <span className="text-red-500 text-sm mt-1 block font-medium">{errors.phoneNumber}</span>}
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
              placeholder="Create a strong password"
              required
            />
            {errors.password && <span className="text-red-500 text-sm mt-1 block font-medium">{errors.password}</span>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg text-base transition-all duration-300 bg-gray-50 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 ${
                errors.confirmPassword ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200' : 'border-gray-200'
              }`}
              placeholder="Confirm your password"
              required
            />
            {errors.confirmPassword && <span className="text-red-500 text-sm mt-1 block font-medium">{errors.confirmPassword}</span>}
          </div>

          <div>
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className={`w-4 h-4 mr-3 mt-1 cursor-pointer ${errors.acceptTerms ? 'border-red-500' : ''}`}
              />
              <span className="text-sm text-gray-700">
                I agree to the{' '}
                <Link to="/terms" className="text-purple-600 hover:text-purple-800 font-semibold hover:underline">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-purple-600 hover:text-purple-800 font-semibold hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.acceptTerms && <span className="text-red-500 text-sm mt-1 block font-medium">{errors.acceptTerms}</span>}
          </div>

          {errors.submit && <div className="text-red-500 text-sm font-medium">{errors.submit}</div>}

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg text-base font-semibold transition-all duration-300 hover:from-purple-700 hover:to-blue-700 hover:shadow-lg hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none relative"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="opacity-0">Creating Account...</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-600 hover:text-purple-800 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
