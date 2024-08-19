import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFingerprint } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      setError(''); 
      setIsButtonDisabled(true); 
      const response = await axios.post('http://localhost:3000/signup', {
        userName,
        email,
        password,
        confirmPassword
      });
      if (response.status === 201) {
        setIsCompleted(true);
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/verify-otp');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'An error occurred');
      } else {
        setError('Network error');
      }
    } finally {
      setIsButtonDisabled(false); 
    }
  };

  const handleFingerprintClick = () => {
    console.log("Fingerprint icon clicked");
  };

  return (
    <>
      {isCompleted && <h2 className="text-center text-green-500 text-lg mb-4">Successfully Account Created</h2>}
      <div className="flex items-center justify-center min-h-screen bg-gradient-custom p-4 sm:p-8">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Sign Up</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={email}
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                maxLength={20}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={password}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                maxLength={20}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={confirmPassword}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="agreement"
                name="agreement"
                required
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="agreement" className="ml-2 block text-sm text-gray-900">
                I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">terms and conditions</a>.
              </label>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
              <button
                type="submit"
                disabled={isButtonDisabled}
                className="w-full sm:w-auto bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={handleFingerprintClick}
                className="w-full sm:w-auto bg-gray-200 text-gray-600 p-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <FontAwesomeIcon icon={faFingerprint} size="lg" />
              </button>
            </div>
            <p className="text-center">Already Have an Account <NavLink to='/signin' className='text-blue-400'>Sign In</NavLink></p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
