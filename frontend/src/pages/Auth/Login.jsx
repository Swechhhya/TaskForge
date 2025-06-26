import React, { useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/layouts/Inputs/Input';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  // 1. Add state for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // 2. Define handleLogin function
  const handleLogin = async (e) => {

    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setError(''); 
    
  // Clear any previous errors
 
    // TODO: Add your login logic here (e.g., call API)
    console.log('Logging in with:', email, password);

    // Example navigation after successful login:
    navigate('/dashboard');
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[7px] mb-5">
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
          <Input
            type="text"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="jack@example.com"
          />

          <Input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
          />

          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

          <button type="submit" className="btn-primary">
            LOGIN
          </button>

<p className="text-[13px] text-slate-800 mt-3">
  Don't have an account?{" "}
  <Link className="font-medium text-primary underline" to="/signup">
    SignUp
  </Link>
</p>

          </form>
      </div>
    </AuthLayout>
  );
};

export default Login;



