<<<<<<< HEAD
import React from "react";

function Input() {
  return <div></div>;
}

export default Input;
=======
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className="text-[13px] text-slate-800">{label}</label>
      <div className="input-box">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value}
         onChange={(e) => onChange(e)}

        />
        {type === "password" && (
          showPassword ? (
            <FaRegEyeSlash
              size={22}
              className="text-slate-400 cursor-pointer"
              onClick={() => toggleShowPassword()}
            />
          ) : (
            <FaRegEye
              size={22}
              className="text-primary cursor-pointer"
              onClick={() =>toggleShowPassword()}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Input;
>>>>>>> eb05e4ba5461775a15b71dcbefafe6f5ed3d2a25
