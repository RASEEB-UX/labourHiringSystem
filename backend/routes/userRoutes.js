const express = require('express');
const router = express.Router();
const validator = require('../assets/registerValidator')
const { registerController, updateController, usersController,checkoutController } = require('../controllers/usercontroller')
router.post('/register', validator, registerController)
router.post('/update',validator,updateController)
router.get('/employees', usersController)
router.post('/checkoutSessionStripe',checkoutController)
module.exports = router