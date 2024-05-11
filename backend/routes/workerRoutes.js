const express = require('express');
const router = express.Router();
const validator = require('../assets/registerValidator')
const { registerController, updateController, usersController,checkoutController } = require('../controllers/workercontroller')
router.post('/register', validator, registerController)
router.put('/update',updateController)
router.get('/getallworkers', usersController)
router.post('/checkoutSessionStripe',checkoutController)
module.exports = router