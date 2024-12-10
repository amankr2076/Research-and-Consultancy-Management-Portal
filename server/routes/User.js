// Import the required modules
const express = require("express")
const router = express.Router()

const {auth,isUser,isAdmin} =require("../middleware/auth");
const {sendotp,signup,login,changepassword} =require("../controller/Auth");
const {resetPasswordToken,resetPassword} = require("../controller/ResetPassword");


// Route for sending OTP to the user's email
router.post("/sendotp", sendotp);

// Route for user signup
router.post("/signup", signup);

// Route for user login
router.post("/login", login)


// Route for user login
router.post("/change-password",auth,changepassword)


// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

// Export the router for use in the main application
module.exports = router