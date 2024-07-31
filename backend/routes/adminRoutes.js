const express = require('express');
const router = express.Router();
const validateAdminData = require('../assets/userRegisterValidator')
const { registerController, getDataController,websiteAnalytics, loginController,sendOtpController,verifyOtpController } = require('../controllers/adminController')
router.post('/register', validateAdminData, registerController)
router.get('/websiteanalytics', websiteAnalytics)
router.post('/login', loginController)
router.post('/sendotp', sendOtpController)
router.post('/verifyotp', verifyOtpController)
router.post('/getadmindata', getDataController)
module.exports = router