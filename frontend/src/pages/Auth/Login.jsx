import { useContext } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { UserContext } from '../../context/userContext';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';






const Login = () => {




    const {updateUser} = useContext(UserContext)
    const navigate = useNavigate();
        // Login API Call
try {
    const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
    });

    const { token, role } = response.data;

    if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        // Redirect based on role
        if (role === "admin") {
            navigate("/admin/dashboard");
        } else {
            navigate("/user/dashboard");
        }
    }
} catch (error) {
    if (error.response && error.response.data.message) {
        setError(error.response.data.message);
    } else {
        setError("Something went wrong. Please try again.");
    }
} 

  return <AuthLayout>Login</AuthLayout>
  }

export default Login


