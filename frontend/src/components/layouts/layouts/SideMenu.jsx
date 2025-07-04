import React, { useContext, useEffects, useState } from 'react';
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../utils/data';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const SideMenu = ({activeMenu}) => {
    const { user, clearUser } = useContext(UserContext);
 const [sideMenuData, setSideMenuData] = useState([]);

 const navigate = useNavigate();

 const handleClick = (route) => {
    if (route === 'Logout') {
        handleLogout();
        return;
    }
    navigate(route);
 };

 const handleLogout = () => {
    localstorage.clear();
    clearUser();
    navigate('/Login');
 };

 useEffect(() => {
    if(user){
        setSideMenuData(user?.role === 'admin' ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA)
    }
    return () => {};
 }, [user]);
 return <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 sticky top-[16px] z-20'>
    <div classNme='flex flex-col items-center justify-center mb-7 pt-5'>
        <div className='relative'>
            <img
            src={user?.profileImageUrl || ''}
            alt='Profile Image'
            className='w-20 h-20 bg-slate-400 ounded-full'
            />
        </div>

        {user?.role === 'admin' && {
            <div className=''>
            Admin
          </div>
       )}

       <h5 className='text-gray-950 font-medium leading-6 mt-3'>
         {user?.name || ''}
        </h5>

        <p className='text-[12px] text-gray-500'>{user?.email || ''}</p>
        </div>

        {sideMenuData.map((item, index) => (
            <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-[15px] ${
                activeMenu ==  item.label
                  ? 'text-primary bg-linear-to-r from-blue-50/40 to-blue-100/50 border-r-3'
                  :''
            } py-3 px-6 mb-3 cursor-pointer`}
            onClick={() => handleClick(item.path)}
            >
                <item.icon className='text-xl' />
                {item.label}
            </button>
        ))}
        </div>;
 };

export default SideMenu;
