const express = require('express');
const router = express.Router();
const validateAdminData = require('../assets/userRegisterValidator')
const { registerController, getDataController, loginController,sendOtpController,verifyOtpController } = require('../controllers/adminController')
router.post('/register', validateAdminData, registerController)
router.post('/login', loginController)
router.post('/sendotp', sendOtpController)
router.post('/verifyotp', verifyOtpController)
router.post('/getadmindata', getDataController)
module.exports = router