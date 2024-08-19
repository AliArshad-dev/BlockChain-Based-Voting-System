import React from 'react';
import Slidebar from '../Slidebar/adminSlidebar';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

const adminSetting = () => {
  const navigate = useNavigate();
// const userData=localStorage.getItem('user');
// const parsedData=JSON.parse(userData);
// const name=parsedData.userName;
//   useEffect(()=>{
// const fetchUser=async()=>{
//   try {
//     const response=await axios.get('http:localhost:3000/user');
//     console.log(response);
//   } catch (error) {
//     console.log(error);
//   }
// }
// fetchUser();
//   },[])
  const handleLogout = () => {
  localStorage.removeItem('adminId');
    navigate('/'); 
  };
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Slidebar />
      <div className="flex-1 p-8 mt-56">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Settings</h2>
          <div className="space-y-4">
            <button
              onClick={handleLogout}
              className="w-full bg-[#0ea5e9] text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default adminSetting;
