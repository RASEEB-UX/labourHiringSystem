const express=require('express')
const router=express.Router()
const validateData=require('../assets/registerValidator')
const {registerRequest,rejectRequest,getAllRequests,approveRequest} =require('../controllers/workerRegisterRequest')
router.post('/register',validateData,registerRequest)
router.post('/rejectworker',rejectRequest)
router.post('/approveworker',approveRequest)
router.get('/getallpendingrequests',getAllRequests)
module.exports=router