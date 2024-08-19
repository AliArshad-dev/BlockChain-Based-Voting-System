import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slidebar from '../NavigationBar/Slidebar';

const VoteArea = () => {
  const [candidates, setCandidates] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/candidates/approved`);
        setCandidates(response.data);
      } catch (err) {
        setError('Failed to fetch candidates');
      } finally {
        setLoading(false);
      }
    };

    const userHasVoted = localStorage.getItem('hasVoted') === 'true';
    setHasVoted(userHasVoted);
    if (!userId) {
      setError('User not logged in. Please log in to vote.');
      setLoading(false);
      return;
    }

    fetchCandidates();
  }, [userId]);

  const handleVote = async (candidateId) => {
    if (!userId) {
      setError('User not logged in');
      return;
    }
    if (hasVoted) {
      setError('You have already voted');
      return;
    }
    try {
      await axios.post('http://localhost:3000/vote', { candidateId, userId });
      setHasVoted(true);
      localStorage.setItem('hasVoted', 'true');
      setMessage('Your vote has been recorded successfully');
      setError('');
    } catch (err) {
      setError('Failed to record vote');
    }
  };

  return (
    <div className="flex">
      <Slidebar />
      <div className="flex flex-col min-h-screen bg-gray-100 flex-1">
        <div className="flex-grow p-6">
          <h2 className="text-2xl font-bold mb-6">Vote for Candidates</h2>
          {loading && <p className="text-gray-500 mb-4">Loading candidates...</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {message && <p className="text-green-500 mb-4">{message}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {candidates.length > 0 ? (
              candidates.map(candidate => {
                const imageUrl = `http://localhost:3000/Images/${candidate.file.filename}`;
                // console.log(imageUrl);
                return (
                  <div key={candidate._id} className="bg-white p-4 rounded-lg shadow-md">
                    <img
                      src={imageUrl}
                      alt={candidate.name}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-lg font-semibold">{candidate.name}</h3>
                    <p className="text-gray-600">{candidate.party}</p>
                    <button
                      onClick={() => handleVote(candidate._id)}
                      className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md disabled:opacity-50"
                      disabled={hasVoted}
                    >
                      Vote
                    </button>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">No candidates available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteArea;
