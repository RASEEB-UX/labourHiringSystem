const workerModel = require('../model/workerModel');
const userModel = require('../model/userModel');
const adminModel = require('../model/adminModel');
const pendingRequestModel = require('../model/pendingRequestsModel');
const cloudinary = require('cloudinary').v2
const bcrypt = require('bcrypt')
const giveUserId = require('../assets/revealUserId')
const jwt = require('jsonwebtoken')
const util = require('util')
const signToken = util.promisify(jwt.sign)
const verifyJsonToken = util.promisify(jwt.verify)
const usersController = async (req, res) => {
  try {
    const user = await workerModel.find().select('-_id -__v -photoid -password');
    res.status(200).json({ failure: false, user })

  }
  catch (err) {
    console.log(err)
    res.status(500).json({ failure: true, message: "oops something went wrong" })
  }
}
const registerController = async (req, res) => {
  let obj = null;
  let photo = null
  try {
    if (!req.body.password)
      return res.status(400).json({ message: "Password Required" })
    const [mobileExistsInUserDb, mobileExistsInWorkerdb, mobileExistsInAdminDb] = await Promise.all([
      userModel.findOne({ mobile: req.body.mobile }),
      workerModel.findOne({ mobile: req.body.mobile }),
      adminModel.findOne({ mobile: req.body.mobile })
    ])
    if (mobileExistsInUserDb || mobileExistsInWorkerdb || mobileExistsInAdminDb)
      return res.status(403).json({ failure: true, message: "this mobile already exists" })
    if (req.files) {
      photo = req.files.photo.tempFilePath;
      obj = await cloudinary.uploader.upload(photo)
      //console.log(obj)
      req.body.photo = obj.secure_url;
      req.body.photoid = obj.public_id;
    }
    else {
      req.body.photo = req.body.imagepath
      req.body.photoid = null
    }
    //  console.log('photo is ', photo)
    req.body.userType = 'worker'
    req.body.password = await bcrypt.hash(req.body.password, 10)
    const userdocument = await workerModel.create(req.body);
    const user = await workerModel.findById(userdocument._id).select('-_id -photoid -__v');
    res.status(200).json({ failure: false, user: user })

  }
  catch (err) {
    if (obj) {
      console.log("deleted asset")
      const delresponse = await cloudinary.uploader.destroy(req.body.photoid);
      console.log(delresponse)
    }
    console.log("err is from usercontroller ", err)
    res.status(500).json({ failure: true, message: "oops server issue happened" })
  }
}
const loginController = async (req, res) => {
  const { userMobile, password: userPassword, userType } = req.body;
  try {
    console.log('req obj is', req.body)
    if (!req.body.password || !req.body.mobile || !req.body.userType)
      return res.status(400).json({ message: 'insufficient data ' })
    const userExists = await workerModel.findOne({ mobile: req.body.mobile })
    if (!userExists)//if user not present give error response not found
      return res.status(404).json({ message: 'user not found' })
    if (userExists.userType !== userType)
      return res.status(400).json({ message: 'invalid userType' })
    const isPasswordCorrect = await bcrypt.compare(userPassword, userExists.password)
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "invalid credientials" })
    const expiryTime = 23 * 24 * 60 * 60
    const uniqueUserId = await giveUserId(req.useragent)
    const authToken = await signToken({ username: userExists.username, mobile: userExists.mobile, userType: userExists.userType, userId: uniqueUserId }, process.env.access_Token_Key, { expiresIn: expiryTime })
    console.log('signed authToken is', authToken)
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: expiryTime * 1000,
    }
    const { _id, __v, photoId, password, ...necessaryData } = userExists.toObject()
    return res.status(200).cookie('authToken', authToken, cookieOptions).json({ user: necessaryData })

  }
  catch (err) {
    console.log('err in user login controller', err)
    return res.status(500).json({ message: "oops server error" })
  }
}
const updateController = async (req, res) => {
  try {
    if (!req.body.age || !req.body.area || !req.body.oldNumber || !req.body.newNumber || !req.body.category)
      return res.status(400).json({ message: "Incomplete Data" })
    console.log('data is', req.body)
    if (req.body.updateMobileNumber) {
      const [numberExistsInWorkerModel, numberExistsInAdminModel, numberExistsInUserModel, numberExistsInPendingModel]
        = await Promise.all([
          workerModel.findOne({ mobile: req.body.newNumber }),
          userModel.findOne({ mobile: req.body.newNumber }),
          adminModel.findOne({ mobile: req.body.newNumber }),
          pendingRequestModel.findOne({ mobile: req.body.newNumber }),
        ])
      if (numberExistsInWorkerModel || numberExistsInAdminModel || numberExistsInUserModel || numberExistsInPendingModel)
        return res.status(403).json({ message: "Use New Number" })
    }
    let user = await workerModel.findOne({ mobile: req.body.oldNumber });
    user = user.toObject()
    const newUpdatedUser = await workerModel.findOneAndUpdate({ mobile: req.body.oldNumber }, {
      ...user,
      area: req.body.area,
      age: req.body.age,
      category: req.body.category,
      mobile: req.body.newNumber
    }, { new: true })
    console.log(newUpdatedUser)
    const expiryTime = 23 * 24 * 60 * 60
    const uniqueUserId = await giveUserId(req.useragent)
    const authToken = await signToken({ username: newUpdatedUser.username, mobile: newUpdatedUser.mobile, userType: newUpdatedUser.userType, userId: uniqueUserId }, process.env.access_Token_Key, { expiresIn: expiryTime })
    console.log('signed authToken is', authToken)
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: expiryTime * 1000,
    }
    const { photoId, password, _id, documentId, labourDocument, aadhaar, __v, ...necessaryData } = newUpdatedUser.toObject()
    res.status(200).cookie('authToken', authToken).json({ success: true, user: necessaryData })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ sucess: false, message: "something went wrong" })
  }
}
const checkApplicationStatus = async (req, res) => {
  try {
    const { mobileNumber } = req.body.mobileNumber
    const isPending = await pendingRequestModel.findOne({ mobile: mobileNumber })
    if (isPending)
      return res.status(200).json({ status: "Application Pending...." })
    const isApproved = await workerModel.findOne({ mobile: mobileNumber })
    if (isApproved)
      return res.status(200).json({ status: "Application Approved" })
    else
      return res.status(200).json({ status: "Application Rejected" })
  }
  catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Server Error" })
  }
}
module.exports = {
  usersController,
  registerController,
  updateController,
  loginController,
  checkApplicationStatus
}