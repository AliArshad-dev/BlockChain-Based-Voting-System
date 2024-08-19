import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSlidebar from '../Slidebar/adminSlidebar';
const CandidateDetails = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCandidates = async () => {
      console.log('Fetching candidates...');
      try {
        const response = await axios.get('http://localhost:3000/candidates/approved');
        console.log('API Response:', response.data); 
        setCandidates(response.data);
        setLoading(false);
      } catch (err) {
        console.error('API Error:', err); 
        setError('Failed to fetch candidates');
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/admin-dashboard/candidates/delete/${id}`);
      setCandidates(candidates.filter(candidate => candidate._id !== id));
    } catch (err) {
      setError('Failed to delete candidate');
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className='flex'>
      <AdminSlidebar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 flex-1">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Candidate Details</h2>
          {candidates.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Party</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qualification</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {candidates.map((candidate) => (
                  <tr key={candidate._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{candidate.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{candidate.party}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{candidate.age}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{candidate.qualification}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{candidate.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(candidate._id)}
                        className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No candidates found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateDetails;
