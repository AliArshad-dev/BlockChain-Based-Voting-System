import React from 'react';
import Image from '../../assets/Image/e-voting.png';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <div className='min-h-screen w-full md:w-full  p-8 bg-gradient-custom'>   <h2 className='font-extrabold text-[40px] text-white p-4 ml-12  text-left'>
          E-Vote
        </h2>
        <div className='flex justify-center md:justify-end '>
          <img src={Image} alt="Vote" className='w-[190px] h-[320px] ml-10 md:w-auto mr-24 ' />
        </div>
        <div className=' flex flex-col space-y-4'>
          <h2 className='text-2xl font-extrabold mb-2 text-white text-center'>
            E-Voting
          </h2>
          <p className='text-white mb-4 text-center'>
            Let's Your voice be heard
          </p>
          <div className='flex flex-col md:flex-row justify-center md:space-x-4 space-y-4 md:space-y-0 sm:-mt-12'>
            <NavLink to="/signup">
              <button className='bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-white hover:text-black transition duration-500 w-full'>
                User Signup/Login
              </button>
            </NavLink>
            <NavLink to="/admin/admin-login">
              <button className='bg-gray-800 text-white py-2 px-4 rounded-md shadow-md hover:bg-white hover:text-black transition duration-300 w-full'>
                Admin Login
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
