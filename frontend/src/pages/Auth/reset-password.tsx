import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import AuthLayout from "../../components/layouts/AuthLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Validate token on component mount
  React.useEffect(() => {
    if (!token) {
      setError("Invalid or missing reset token.");
    }
  }, [token]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError("Invalid reset token.");
      return;
    }

    // Frontend validations
    if (!newPassword || newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setMessage("");
    setLoading(true);

    try {
      // Send new password to backend
      const response = await axiosInstance.post(
        `${API_PATHS.AUTH.RESET_PASSWORD}/${encodeURIComponent(token)}`,
        { newPassword } // must match backend field
      );

      setMessage(response.data.msg || "Password reset successful!");
      toast.success("Password reset successful! Redirecting to login...");
      
      // Clear form
      setNewPassword("");
      setConfirmPassword("");

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      console.error("Reset password error:", err);

      const errorMessage = err.response?.data?.msg || 
                          err.response?.data?.message || 
                          "Failed to reset password. Please try again.";
      
      setError(errorMessage);
      toast.error(errorMessage);
      
      // If token is invalid/expired, redirect to forgot password
      if (err.response?.status === 400 && errorMessage.includes('token')) {
        setTimeout(() => {
          navigate("/forgot-password");
        }, 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%]">
        <h3 className="text-xl font-semibold text-black">Reset Password</h3>
        <p className="text-xs text-slate-700 mt-[7px] mb-5">
          Enter your new password below.
        </p>

        <form onSubmit={handleResetPassword}>
          <Input
            type="password"
            value={newPassword}
            onChange={({ target }) => setNewPassword(target.value)}
            label="New Password"
            placeholder="Min 8 characters"
          />

          <Input
            type="password"
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
            label="Confirm Password"
            placeholder="Re-enter new password"
          />

          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          {message && <p className="text-green-500 text-xs mt-2">{message}</p>}

          <button type="submit" className="btn-primary mt-3" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
          
          <div className="mt-4 text-center">
            <a 
              href="/forgot-password" 
              className="text-sm text-primary underline hover:opacity-80"
            >
              Request New Reset Link
            </a>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
