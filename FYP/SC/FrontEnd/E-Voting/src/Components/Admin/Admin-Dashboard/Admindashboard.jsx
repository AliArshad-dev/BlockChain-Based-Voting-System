import React, { useEffect, useState } from 'react';
import Slidebar from '../Slidebar/adminSlidebar';
import axios from 'axios';

const Admindashboard = () => {
  const [stats, setStats] = useState({
    totalCandidates: 0,
    totalVoters: 0,
    totalVotes: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/admin-dashboard');
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch statistics', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
    <div className='flex'>
    <Slidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Admin Dashboard</h1>
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Welcome, Admin!</h2>
            <p className="text-gray-600">Here is an overview of the current status:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-blue-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-blue-800">Total Candidates</h3>
                <p className="text-2xl font-bold text-blue-600">{stats.totalCandidates}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-green-800">Total Voters</h3>
                <p className="text-2xl font-bold text-green-600">{stats.totalVoters}</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-yellow-800">Total Votes</h3>
                <p className="text-2xl font-bold text-yellow-600">{stats.totalVotes}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    
    </div>
    </>
  );
};

export default Admindashboard;
