import React, { useContext, useEffect, useState } from 'react';
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../utils/data';
import { UserContext } from '../../context/userContext';
import { useNavigate, useLocation } from 'react-router-dom';
import userIcon from '../../assets/user-icon.jpg';

const SideMenu = ({ onMenuClick }) => {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (route) => {
    if (route === 'Logout') {
      handleLogout();
      return;
    }
    navigate(route);

    // Close sidebar in mobile view
    if (onMenuClick) onMenuClick();
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/login');
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(
        user?.role === 'admin' ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA
      );
    }
  }, [user]);

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 sticky top-[61px] z-20">
      {/* Profile section */}
      <div className="flex flex-col items-center justify-center mb-7 pt-5">
        <div className="relative">
          <img
            src={user?.profileImageUrl || userIcon}
            alt="Profile"
            className="w-20 h-20 bg-slate-400 rounded-full"
          />
        </div>

        {user?.role === 'admin' && (
          <div className="text-[10px] font-medium text-white bg-primary px-3 py-0.5 rounded mt-1">
            Admin
          </div>
        )}

        <h5 className="text-gray-950 font-medium leading-6 mt-3">
          {user?.name || ''}
        </h5>
        <p className="text-[12px] text-gray-500">{user?.email || ''}</p>
      </div>

      {/* Menu items */}
      {sideMenuData.map((item, index) => {
        const isActive = location.pathname === item.path; // highlight based on route
        return (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-[15px] relative
              py-3 px-6 mb-2 cursor-pointer transition-all duration-200
              ${isActive
                ? 'text-blue-600 font-medium bg-blue-50'
                : 'text-gray-700 hover:bg-gray-100'
              }`}
            onClick={() => handleClick(item.path)}
          >
            {/* Left blue line */}
            {isActive && (
              <span className="absolute left-0 top-0 h-full w-1 bg-blue-600 rounded-r-md"></span>
            )}

            <item.icon className="text-xl" />
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default SideMenu;
