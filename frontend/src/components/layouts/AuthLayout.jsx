import React from 'react';
import UI_IMG from '../../assets/images/bg-img.png';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex w-screen h-screen">
      {/* Left: Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

      {/* Right: Background Image */}
      <div
        className="hidden md:block sm:w-[40vw] 
    md:w-[35vw] 
    lg:w-[45vw] 
    xl:w-[50vw]
opacity-85 h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${UI_IMG})` }}
      />
    </div>
  );
};

export default AuthLayout;