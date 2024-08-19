import React from 'react';
import { NavLink,useLocation} from 'react-router-dom';

const AdminSlidebar = () => {
  const location=useLocation();
  const isActive=(path)=>location.pathname===path;
  return (
    <div className="w-64 h-screen bg-[#0284c7] text-white flex flex-col text-center">
      <div className="p-4 text-xl font-bold">
      <NavLink
              to='/admin/admin-dashboard'
            >
          Admin Dashboard
            </NavLink>   
      </div>
      <nav className="flex-1">
        <ul className="mt-6 space-y-4">
          <li className={`${isActive('/admin-dashboard/candidates')?'bg-white text-black':''} p-4`}>
            <NavLink
              to='/admin-dashboard/candidates'
            >
              Candidate Details
            </NavLink>
          </li>
          <li className={`${isActive('/add-candidate')?'bg-white text-black':''} p-4`}>
            <NavLink
              to='/add-candidate'
             
            >
              Add Candidate
            </NavLink>
          </li>
          <li className={`${isActive('/adminSetting')?'bg-white text-black':''} p-4`}>
            <NavLink
              to='/adminSetting'
            
              
            >
              Setting
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSlidebar;
