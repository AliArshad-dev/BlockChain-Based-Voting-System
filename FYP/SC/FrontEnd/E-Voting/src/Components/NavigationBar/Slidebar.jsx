import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Slidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const userID = localStorage.getItem('userId');

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative ${isOpen ? 'w-[220px] h-fullscreen' : 'w-12 h-12'} lg:w-52 lg:h-screen bg-[#0284c7] text-white flex flex-col text-center transition-all duration-300`}>
      <button
        onClick={handleToggle}
        className="absolute top-4 left-4 text-white lg:hidden"
      >
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>
      <div>
       <h2  className={`p-4 text-xl font-bold ${isOpen ? 'mt-12' :'hidden'} lg:block`}>Voting App</h2> 
      </div>
      <nav className={`flex-1 ${isOpen ? 'block' : 'hidden'} lg:block`}>
        <ul className="mt-6 space-y-2">
          <li>
            <NavLink
              to={`/user-dashboard/${userID}`}
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? 'bg-white text-black' : 'hover:bg-gray-700'
                }`
              }
            >
              Information
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/voting-registration"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? 'bg-white text-black' : 'hover:bg-gray-700'
                }`
              }
            >
              Voting Registration
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/vote"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? 'bg-white text-black' : 'hover:bg-gray-700'
                }`
              }
            >
              Voting Area
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/result"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? 'bg-white text-black' : 'hover:bg-gray-700'
                }`
              }
            >
              Result
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/setting"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? 'bg-white text-black' : 'hover:bg-gray-700'
                }`
              }
            >
              Setting
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Slidebar;
