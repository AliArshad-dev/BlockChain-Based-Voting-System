import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slidebar from '../NavigationBar/Slidebar';

const Result = () => {
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:3000/result');
        setCandidates(response.data);
      } catch (error) {
        setError('Failed to fetch results');
      }
    };

    fetchResults();
  }, []);

  return (
    <>
    <div className='flex'>
    <Slidebar />
    <div className="flex flex-col min-h-screen flex-1 bg-gray-100">
      <div className="flex-grow p-6">
        <h2 className="text-2xl font-bold mb-6">Election Results</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {candidates.map(candidate => (
            <div key={candidate._id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={`http://localhost:3000/Images/${candidate.file.filename}`}
                alt={candidate.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">{candidate.name}</h3>
              <p className="text-gray-600">{candidate.party}</p>
              <p className="text-gray-800 mt-2 font-medium">Votes: {candidate.votes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
 
    </div>
     
    </>
    );
};

export default Result;
