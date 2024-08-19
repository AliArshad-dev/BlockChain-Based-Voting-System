import React, { useState } from 'react';
import axios from 'axios';

const FingerprintVerification = () => {
    const [status, setStatus] = useState('');
    const [fingerprintData, setFingerprintData] = useState(null);

    const captureFingerprint = async () => {
        setFingerprintData('fakeFingerprintData'); // Replace with real data capturing logic
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!fingerprintData) {
            setStatus('Please capture your fingerprint first.');
            return;
        }

        try {
            await axios.post('http://localhost:3000/verify-fingerprint', { fingerprintData });
            setStatus('Fingerprint verified successfully!');
        
        } catch (err) {
            setStatus('Error verifying fingerprint.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-custom">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Verify Fingerprint</h2>
                <button
                    onClick={captureFingerprint}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Capture Fingerprint
                </button>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Submit Fingerprint
                    </button>
                </form>
                <p className="mt-4 text-red-500">{status}</p>
            </div>
        </div>
    );
};

export default FingerprintVerification;
