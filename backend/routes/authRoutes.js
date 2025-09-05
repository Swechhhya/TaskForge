const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const { authLimiter, passwordResetLimiter } = require("../middlewares/rateLimiter");
const { 
  validateUserRegistration, 
  validateUserLogin, 
  validatePasswordReset 
} = require("../middlewares/validation");

const router = express.Router();

//Auth Routes
router.post("/register", authLimiter, upload.single("image"), validateUserRegistration, registerUser);
router.post("/login", authLimiter, validateUserLogin, loginUser);
router.post("/forgot-password", passwordResetLimiter, forgotPassword);
router.post("/reset-password/:token", validatePasswordReset, resetPassword);
router.get("/profile", protect, getUserProfile); //Get User Profile
router.put("/profile", protect, updateUserProfile); //Update Profile

router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({ imageUrl });
});

module.exports = router;
