import FingerprintJS from '@fingerprintjs/fingerprintjs';

const getFingerprint = async () => {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId;
};

const handleSignUp = async (userData) => {
  const fingerprint = await getFingerprint();
  const response = await fetch('http://localhost:3001/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...userData, fingerprint }),
  });

  const data = await response.json();
  // Handle response
};
