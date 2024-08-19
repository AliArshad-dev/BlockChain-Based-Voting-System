import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSlidebar from '../Slidebar/adminSlidebar';

const AddCandidate = () => {
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('http://localhost:3000/candidates/pending');
          setCandidates(response.data);
      } catch (err) {
        setError('Failed to fetch candidates');
      }
    };
    fetchCandidates();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:3000/candidates/approve/${id}`);
      setMessage('Candidate approved successfully');
      setCandidates(candidates.map(candidate => 
        candidate._id === id ? { ...candidate, status: 'approved' } : candidate
      ));
    } catch (err) {
      setError('Failed to approve candidate');
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(`http://localhost:3000/candidates/reject/${id}`);
      setMessage('Candidate rejected successfully');
      setCandidates(candidates.map(candidate => 
        candidate._id === id ? { ...candidate, status: 'rejected' } : candidate
      ));
    } catch (err) {
      setError('Failed to reject candidate');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/candidates/delete/${id}`);
      setMessage('Candidate deleted successfully');
      setCandidates(candidates.filter(candidate => candidate._id !== id));
    } catch (err) {
      setError('Failed to delete candidate');
    }
  };

  const pendingCandidates = candidates.filter(candidate => candidate.status === 'pending');

  return (
    <div className='flex'>
      <AdminSlidebar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 flex-1">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Manage Candidates</h2>
          {message && <p className="mt-4 text-green-500">{message}</p>}
          {error && <p className="mt-4 text-red-500">{error}</p>}
          <div className="overflow-x-auto">
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
                {pendingCandidates.map(candidate => (
                  <tr key={candidate._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{candidate.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{candidate.party}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{candidate.age}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{candidate.qualification}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{candidate.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleApprove(candidate._id)}
                        className="bg-green-500 text-white py-1 px-3 rounded-md mr-2 hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(candidate._id)}
                        className="bg-yellow-500 text-white py-1 px-3 rounded-md mr-2 hover:bg-yellow-600"
                      >
                        Reject
                      </button>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCandidate;
