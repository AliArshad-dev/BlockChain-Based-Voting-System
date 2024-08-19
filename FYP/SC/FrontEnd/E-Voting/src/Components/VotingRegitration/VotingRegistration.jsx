import React, { useState, useEffect } from 'react';
import Slidebar from '../NavigationBar/Slidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VotingRegistration = () => {
  const [name, setName] = useState('');
  const [party, setParty] = useState('');
  const [age, setAge] = useState('');
  const [qualification, setQualification] = useState('');
  const [cnicNumber, setCnicNumber] = useState('');
  const [address, setAddress] = useState('');
  const [details, setDetails] = useState('');
  const [registrationType, setRegistrationType] = useState('voter');
  const [file, setFile] = useState(null); // File state
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasRegistered, setHasRegistered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserStatus = async () => {
      const email = JSON.parse(localStorage.getItem('Email'));
      if (!email) {
        setError('Email not found. Please log in again.');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3000/voting-registration/${encodeURIComponent(email)}`);
        setHasRegistered(response.data.hasRegistered);
        setIsButtonDisabled(response.data.hasRegistered);
      } catch (err) {
        console.error('Failed to fetch user status', err);
        setError('Failed to fetch user status.');
      }
    };

    fetchUserStatus();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isButtonDisabled) {
      setError('You are already registered and cannot register again.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    const email = JSON.parse(localStorage.getItem('Email'));
    if (!email) {
      setError('Email not found. Please log in again.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('registrationType', registrationType);
    formData.append('hasRegistered', true);

    if (registrationType === 'candidate') {
      if (!name || !party || !age || !qualification || !details) {
        setError('All candidate fields are required');
        setLoading(false);
        return;
      }
      if (isNaN(age) || age < 18) {
        setError('Age must be a number and at least 18');
        setLoading(false);
        return;
      }
      formData.append('name', name);
      formData.append('party', party);
      formData.append('age', age);
      formData.append('qualification', qualification);
      formData.append('details', details);
      if (file) formData.append('file', file);
    } else if (registrationType === 'voter') {
      if (!cnicNumber || !address) {
        setError('CNIC number and address are required for voters');
        setLoading(false);
        return;
      }
      formData.append('cnicNumber', cnicNumber);
      formData.append('address', address);
    } else {
      setError('Invalid registration type');
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/voting-registration', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(`Successfully registered as a ${registrationType}`);
      setName('');
      setParty('');
      setAge('');
      setQualification('');
      setDetails('');
      setCnicNumber('');
      setAddress('');
      setFile(null);
      setIsButtonDisabled(true);
      setHasRegistered(true);
      localStorage.setItem('hasRegistered', 'true');
    } catch (err) {
      console.error(`Failed to register ${registrationType}`, err);
      setError(err.response?.data?.message || `Failed to register ${registrationType}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Slidebar />
      <div className="flex-1 p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-28">
          <h2 className="text-2xl font-bold mb-6 text-center">Voting Registration</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="registrationType" className="block text-sm font-medium text-gray-700 mb-1">
                Register as
              </label>
              <select
                id="registrationType"
                value={registrationType}
                onChange={(e) => setRegistrationType(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                disabled={hasRegistered}
              >
                <option value="">Select Registration Type</option>
                <option value="voter">Voter</option>
                <option value="candidate">Candidate</option>
              </select>
            </div>

            {registrationType === 'candidate' && (
              <>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="party" className="block text-sm font-medium text-gray-700">Party</label>
                  <input
                    type="text"
                    id="party"
                    value={party}
                    onChange={(e) => setParty(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                  <input
                    type="number"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">Qualification</label>
                  <input
                    type="text"
                    id="qualification"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="details" className="block text-sm font-medium text-gray-700">Why are you eligible for Candidancy</label>
                  <textarea
                    id="details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    style={{ resize: 'none' }}
                  />
                </div>
                <div>
                  <label htmlFor="file" className="block text-sm font-medium text-gray-700">Upload a Picture</label>
                  <input
                    type="file"
                    id="file"
                    onChange={handleFileChange} 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </>
            )}

            {registrationType === 'voter' && (
              <>
                <div>
                  <label htmlFor="cnicNumber" className="block text-sm font-medium text-gray-700">CNIC Number Without -</label>
                  <input
                    type="text"
                    id="cnicNumber"
                    value={cnicNumber}
                    onChange={(e) => setCnicNumber(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isButtonDisabled || loading}
              className={`w-full py-2 px-4 rounded-md shadow-sm focus:outline-none ${loading ? 'bg-gray-500' : 'bg-indigo-600 hover:bg-indigo-700'} text-white`}
            >
              {loading ? 'Submitting...' : 'Register'}
            </button>
            {message && <p className="text-green-500 mt-2">{message}</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default VotingRegistration;
