<<<<<<< HEAD
import React, { useContext } from "react";
import UserContext from "../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="">
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
          
          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
=======
import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DashboardLayout = ({children, activeMenu}) => {
    const { user } = useContext(UserContext);
return (
    <div className=''>
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className='flex'>
            <div className='max-[1080px]:hidden'>
                <SideMenu activeMenu={activeMenu} />
                </div>

                <div className='grow mx-5'>{children}</div>
                </div>
      )}
      </div>
   );
 };
 export default DashboardLayout;
>>>>>>> eb05e4ba5461775a15b71dcbefafe6f5ed3d2a25
