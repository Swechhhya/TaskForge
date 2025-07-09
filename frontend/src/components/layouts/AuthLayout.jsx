import React from 'react';
import UI_IMG from '../../assets/images/bg-img.png';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-gray-50 ">
      {/* Left: Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-12 py-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 h-screen">
  <img
    src={UI_IMG}
    alt="Background visual"
    className="w-full h-full object-cover opacity-85"
  />
</div>
    </div>
  );
};

export default AuthLayout;