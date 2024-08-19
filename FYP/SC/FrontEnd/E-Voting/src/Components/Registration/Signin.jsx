import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFingerprint } from '@fortawesome/free-solid-svg-icons';
const signin = () => {
    const navigate=useNavigate();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const handleSubmit = async (e) => {
        const userId=localStorage.getItem('userID');
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3000/signin', { email, password });
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userId', response.data.userId); 
      
localStorage.setItem('Email', JSON.stringify(response.data.email));

          navigate(`/user-dashboard/${response.data.userId}`);
        } catch (error) {
          console.error('Error signing in:', error);
        }
      };
  return (
<>
<div className="flex items-center justify-center min-h-screen bg-gradient-custom">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Sign In</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
    onChange={(e)=>setEmail(e.target.value)}      
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
            onChange={(e)=>setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
       <div className='flex'>
       <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
          <button
                type="button"
                className="w-[120px] bg-gray-200 text-gray-600 p-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <FontAwesomeIcon icon={faFingerprint} size="lg" />
              </button>
        </div> 
       
          <div className="mt-4 text-sm text-gray-600">
            <p>Don't have an account? <a href="/signup" className="text-indigo-600 hover:text-indigo-500">Sign Up</a></p>
          </div>
        </form>
      </div>
    </div>
</>
  )
}

export default signin