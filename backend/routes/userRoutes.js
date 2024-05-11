const express = require('express');
const router = express.Router();
const validateUserData = require('../assets/userRegisterValidator')
const { registerController, updateController, userController, loginController,sendOtpController,verifyOtpController } = require('../controllers/userController')
router.post('/register', validateUserData, registerController)
router.post('/update', updateController)
router.post('/login', loginController)
router.post('/sendotp', sendOtpController)
router.post('/verifyotp', verifyOtpController)
router.post('/getuserdata', userController)
module.exports = router