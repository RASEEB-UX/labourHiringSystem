const express = require('express')
const adminModel = require('../model/adminModel')
const cloudinary = require('cloudinary').v2
const util = require('util')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { sendOtp, verifyOtp } = require('../assets/email')
const { v4: uuidv4 } = require('uuid');

const signToken = util.promisify(jwt.sign)
const verifyJsonToken = util.promisify(jwt.verify)
const loginController = async (req, res) => {
    const { email, password, userType } = req.body;
    try {
        if (!email || !password || !userType)
            return res.status(400).json({ message: 'insufficient data ' })
        const userExists = await adminModel.findOne({ email: email })
        if (!userExists)//if user not present give error response not found
            return res.status(404).json({ message: 'user not found' })
        if (userExists.userType !== userType)
            return res.status(400).json({ message: 'invalid userType' })
        const isPasswordCorrect = await bcrypt.compare(password, userExists.password)
        if (!isPasswordCorrect)
            return res.status(400).json({ message: "invalid credientials" })
        return res.status(200).json({ message: 'admin valid go for otp verification' })
    }
    catch (err) {
        console.log('err in admin login controller')
        return res.status(500).json({ message: "oops server error" })
    }
}
const getDataController = async (req, res) => {
    try {
        if (!req.body.email)
            return res.status(400).json({ message: "Admin Email Required" })
        const data = await adminModel.findOne({ email: req.body.email }, { _id: 0, __v: 0, password: 0, photoId: 0 })
        if (!data)
            return res.status(404).json({ message: 'Admin not found' })
        return res.status(200).json({ user: data })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}
const registerController = async (req, res) => {
    let obj = null;
    let photo = null
    let userdocument = null
    try {
        //console.log('photo is ',req.files.photo)
        const userExists = adminModel.findOne({ email: req.body.adhaar })
        const mobileExists = adminModel.findOne({ mobile: req.body.mobile })
        const [existinguser, existingmobile] = await Promise.all([userExists, mobileExists])
        if (existinguser || existingmobile)
            return res.status(403).json({ failure: true, message: "this email or mobile already exists" })
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
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashedPassword
        //  console.log('photo is ', photo)
        userdocument = await adminModel.create(req.body);
        const { _id, __v, photoId, password, ...refinedData } = userdocument.toObject()
        res.status(200).json({ failure: false, user: refinedData })

    }
    catch (err) {
        if (obj) {
            console.log("deleted asset")
            const delresponse = await cloudinary.uploader.destroy(req.body.photoid);
            console.log(delresponse)
        }
        if (userdocument) {
            const deletedUser = await adminModel.findOneAndDelete({ email: userdocument.email })
            console.log('deleted admin successfully', deletedUser)
        }
        console.log("err is from admincontroller ", err)
        res.status(500).json({ failure: true, message: "oops server issue happened" })
    }
}
const sendOtpController = async (req, res) => {
    try {
        if (!req.body.email)
            return res.status(400).json({ message: 'email required' })
        const userExists = await adminModel.findOne({ email: req.body.email })
        if (!userExists)
            return res.status(404).json({ message: "user not found" })
        const otp = await sendOtp(req.body.email)
        return res.status(200).json({ message: 'otp sent successfully' })

    }
    catch (err) {
        console.log('error in sendOtp Controller in admin Controller')
        return res.status(err.status).json({ message: err.message })
    }
}
const verifyOtpController = async (req, res) => {
    try {
        if (!req.body.email)
            return res.status(400).json({ message: 'insufficient data' })
        if (!req.body.otp)
            return res.status(400).json({ message: 'otp required' })
        const userExists = await adminModel.findOne({ email: req.body.email })
        if (!userExists)
            return res.status(404).json({ message: "user not found" })
        const response = await verifyOtp(req.body.otp)
        //get device id by deviceUUid package
        const expiryTime = 23 * 24 * 60 * 60
        const { source, browser, version, os, platform, geoIp, isMobile, isWindows, isLinux, isLinux64 } = req.useragent
        const deviceFirstId = uuidv4();
        const userData = JSON.stringify({ source, browser, version, os, platform, geoIp, isMobile, isWindows, isLinux, isLinux64, deviceFirstId })
        console.log('user data is', userData)
        const uniqueUserId = await bcrypt.hash(userData, 10) //hash this user specific info
        const authToken = await signToken({ username: userExists.username, email: userExists.email, userType: userExists.userType, userId: uniqueUserId }, process.env.access_Token_Key, { expiresIn: expiryTime })
        console.log('signed authToken is', authToken)
        const decodedToken = await verifyJsonToken(authToken, process.env.access_Token_Key)
        console.log('decoded token is ', decodedToken)
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: expiryTime * 1000,
        }

        return res.status(200).cookie('authToken', authToken, cookieOptions).json({ message: "user authenticated ,token issued" })
    }
    catch (err) {
        console.log(err.status)
        console.log('error in verifyotp controller from user controller', err.message)
        return res.status(err.status).json({ message: err.message })
    }
}
module.exports = {
    loginController,
    getDataController,
    registerController,
    sendOtpController,
    verifyOtpController
}