const express = require('express');
const router = express.Router();
const validator = require('../assets/registerValidator')
const { registerController, updateController, usersController } = require('../controllers/usercontroller')
router.post('/register', validator, registerController)
router.post('/update', updateController)
router.get('/employees', usersController)
module.exports = router