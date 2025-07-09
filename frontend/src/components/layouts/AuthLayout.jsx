import React from 'react';
import UI_IMG from '../../assets/images/bg-img.png';

const AuthLayout = ({ children }) => {
  
  return (
    <div
      className="w-screen h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url("${UI_IMG}")`,
      }}
    >
      <div className="bg-white bg-opacity-80 rounded-lg p-8 w-[90%] md:w-[60vw] h-[90%] overflow-auto shadow-lg z-10">
        <h2 className="text-xl font-semibold text-black mb-4">Task Manager</h2>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;

