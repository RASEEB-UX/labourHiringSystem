const express = require('express');
const router = express.Router();
const { addAdvertisement, getAdvertisement,removeAdvertisement } = require('../controllers/advertisementController')
router.post('/addAdvertisement', addAdvertisement)
router.get('/getAdvertisement', getAdvertisement)
router.delete('/removeAdvertisement', removeAdvertisement)


module.exports = router