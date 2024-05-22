const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const util = require('util')
const getMachineId= require('node-machine-id')
const giveUserId = require('../assets/revealUserId')
require('dotenv').config()
const verifyJsonToken = util.promisify(jwt.verify)
const checkAuthStatus = async (req, res) => {
    try {
        const machineUniqueId= await getMachineId.machineId()
        console.log('mac address is',machineUniqueId)
        console.log('cookies are', req.cookies)
        if (!req.cookies || !req.cookies?.authToken)
            return res.status(400).json({ message: "authentication failed token missing" })
        const userToken = req.cookies.authToken
        const decodedToken = await verifyJsonToken(userToken, process.env.access_Token_Key)
        const userId = await giveUserId(req.useragent)
        console.log('userid ,decodedid is',userId,decodedToken.userId)
        const isDeviceIdCorrect = userId==decodedToken.userId
        if (!isDeviceIdCorrect)
            return res.status(400).json({ message: "invalid credientials user not authenticated" })
        return res.status(200).json({ username: decodedToken.username,mobile:decodedToken.mobile, email: decodedToken?.email, userType: decodedToken.userType, message: "user authenticated successfully" })
    }
    catch (err) {
        console.log('err in checkauthstatus function ', err)
        return res.status(500).json({ message: "Server Error Occurred" })
    }
}
module.exports = checkAuthStatus