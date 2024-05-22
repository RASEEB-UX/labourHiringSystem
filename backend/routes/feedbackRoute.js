const express= require('express')
const {addfeedback,getAllFeedbacks, deleteFeedback}=require('../controllers/feedbackController')
const router= express.Router()
router.post('/addfeedback',addfeedback)
router.get('/getallfeedbacks',getAllFeedbacks)
router.delete('/deletefeedback',deleteFeedback)
module.exports=router