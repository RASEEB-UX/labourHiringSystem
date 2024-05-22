const express = require('express');
const router = express.Router();
const validator = require('../assets/registerValidator')
const { registerController, updateController, usersController,loginController } = require('../controllers/workercontroller');

router.post('/register', validator, registerController)
router.put('/update',updateController)
router.get('/getallworkers', usersController)
router.post('/login', loginController)
module.exports = router