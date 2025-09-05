import React, { useState } from "react";
import Input from "../../components/Inputs/Input";
import AuthLayout from "../../components/layouts/AuthLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { validateEmail } from "../../utils/validation";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    // Frontend validations
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.FORGOT_PASSWORD, { email });
      
      setMessage(response.data.msg || "Password reset link has been sent to your email.");
      toast.success("Password reset email sent successfully!");
      
      // Clear form
      setEmail("");
    } catch (err) {
      console.error("Forgot password request error:", err);
      
      const errorMessage = err.response?.data?.msg || 
                          err.response?.data?.message || 
                          "Failed to send reset email. Please try again.";
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%]">
        <h3 className="text-xl font-semibold text-black">Forgot Password</h3>
        <p className="text-xs text-slate-700 mt-[7px] mb-5">
          Enter your email and we’ll send you a password reset link.
        </p>

        <form onSubmit={handleForgotPassword}>
          <Input
            type="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="jack@example.com"
          />

          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          {message && <p className="text-green-500 text-xs mt-2">{message}</p>}

          <button
            type="submit"
            className="btn-primary mt-3"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
          
          <div className="mt-4 text-center">
            <a 
              href="/login" 
              className="text-sm text-primary underline hover:opacity-80"
            >
              Back to Login
            </a>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
