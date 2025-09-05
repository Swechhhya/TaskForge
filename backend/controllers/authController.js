const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

// Generate JWT Token
const generateToken = (userID) => {
  return jwt.sign({ id: userID }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ==================== Register User ====================
const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl, adminInviteToken } = req.body;

    // Build profileImageUrl safely
    let profileUrl = "";
    if (req.file) {
      profileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    } else if (typeof profileImageUrl === "string") {
      profileUrl = profileImageUrl;
    } else if (typeof profileImageUrl === "object" && profileImageUrl?.url) {
      profileUrl = profileImageUrl.url;
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Determine role
    let role = "user";
    if (adminInviteToken && adminInviteToken === process.env.ADMIN_INVITE_TOKEN) {
      role = "admin";
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl: profileUrl,
      role,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ==================== Login User ====================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ==================== Get User Profile ====================
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ==================== Update User Profile ====================
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // Ensure profileImageUrl is string
    if (req.body.profileImageUrl) {
      if (typeof req.body.profileImageUrl === "string") {
        user.profileImageUrl = req.body.profileImageUrl;
      } else if (typeof req.body.profileImageUrl === "object" && req.body.profileImageUrl.url) {
        user.profileImageUrl = req.body.profileImageUrl.url;
      }
    }

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      profileImageUrl: updatedUser.profileImageUrl,
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ==================== Forgot Password ====================
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Use longer expiry for production to account for email delivery delays
    const tokenExpiry = process.env.NODE_ENV === 'production' ? '30m' : '15m';
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: tokenExpiry });
    
    // Dynamic frontend URL based on environment
    const frontendUrl = process.env.FRONTEND_URL || 
                       process.env.CLIENT_URL || 
                       (process.env.NODE_ENV === 'production' 
                         ? 'https://your-app-domain.com' 
                         : 'http://localhost:5173');
    
    const resetLink = `${frontendUrl}/reset-password/${token}`;
    
    console.log(`Password reset requested for: ${email}`);
    console.log(`Reset link: ${resetLink}`);

    const htmlMessage = `
      <p>Hello ${user.name},</p>
      <p>You requested a password reset. Click below to reset your password:</p>
      <p><a href="${resetLink}" style="display:inline-block;padding:10px 20px;background:#4CAF50;color:white;text-decoration:none;border-radius:5px;">Reset Password</a></p>
      <p>If button doesn’t work, copy/paste this URL:</p>
      <p>${resetLink}</p>
      <p>This link expires in ${tokenExpiry}.</p>
      <p>If you didn't request this, please ignore this email.</p>
      <br>
      <p>Best regards,<br>TaskForge Team</p>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: "TaskForge - Password Reset Request",
        message: `Click here to reset your password: ${resetLink}`,
        html: htmlMessage,
      });
      
      console.log(`✅ Password reset email sent successfully to: ${email}`);
    } catch (emailError) {
      console.error(`❌ Failed to send password reset email to ${email}:`, emailError);
      return res.status(500).json({ 
        msg: "Failed to send password reset email. Please try again later." 
      });
    }

    res.json({ 
      msg: "If an account with this email exists, a password reset link has been sent." 
    });
  } catch (err) {
    console.error("Forgot password error:", err.message);
    res.status(500).json({ 
      msg: "Unable to process password reset request. Please try again later." 
    });
  }
};

// ==================== Reset Password ====================
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ msg: "Invalid token" });

    // Hash the new password
    user.password = await bcrypt.hash(newPassword, await bcrypt.genSalt(10));

    // Ensure profileImageUrl is always a string
    if (!user.profileImageUrl) {
      user.profileImageUrl = "";
    } else if (typeof user.profileImageUrl === "object") {
      user.profileImageUrl = user.profileImageUrl.url || "";
    }

    await user.save();

    res.json({ msg: "Password updated successfully!" });
  } catch (err) {
    console.error("Reset password error:", err.message);
    res.status(400).json({ msg: "Invalid or expired token", error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword,
};
