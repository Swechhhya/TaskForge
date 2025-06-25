import React, { useContext } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {












    const {updateUser} = useContext(UserContext)
    const navigate=useNavigate();





let profileImageUrl = '';
















  

//signup API call
  try {

    //Upload image if present
    if (profilePic) {
      const imageUploadRes = await uploadImage (profilePic);
      profileImageUrl = imageUploadRes.imageUrl || "";
    }

    const response = await axiosInstance.post(API_PATHS,AUTH.REGISTER, {
    name: fullName,
    email,
    password,
    profileImageUrl,
    adminInviteToken
});

const { token, role } = response.data;

if (token) {
    localStorage.setItem("token", token);
    updateUser(response.data);
}

// Redirect based on role
if (role === "admin") {
    navigate("/admin/dashboard");
}else {
    navigate("/user/dashboard");
}
} catch (error) {
    if (error.response && error.response.data.message) {
        setError(error.response.data.message);
    } else {
        setError("Something went wrong. Please try again.");
    }
} 
  return (
<div>SignUp</div>
 )
}

export default SignUp
