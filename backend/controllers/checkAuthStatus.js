const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const util = require('util')
require('dotenv').config()
const { v4: uuidv4 } = require('uuid');
const verifyJsonToken = util.promisify(jwt.verify)
const checkAuthStatus = async (req, res) => {
    try {
        console.log('cookies are',req.cookies)
        if (!req.cookies  || !req.cookies?.authToken)
            return res.status(400).json({ message: "authentication failed token missing" })
        const userToken = req.cookies.authToken
        const decodedToken = await verifyJsonToken(userToken, process.env.access_Token_Key)
        const deviceFirstId = uuidv4();
        console.log(deviceFirstId)
        const { source, browser, version, os, platform, geoIp, isMobile, isWindows, isLinux, isLinux64 } = req.useragent
        const userData = JSON.stringify({ source, browser, version, os, platform, geoIp, isMobile, isWindows, isLinux, isLinux64, deviceFirstId })
        console.log('decoded token is', decodedToken)
        const isDeviceIdCorrect = await bcrypt.compare(userData, decodedToken.userId)
        if (!isDeviceIdCorrect)
            return res.status(400).json({ message: "invalid credientials user not authenticated" })
        return res.status(200).json({ username: decodedToken.username, email: decodedToken.email, userType: decodedToken.userType, message: "user authenticated successfully" })
    }
    catch (err) {
        console.log('err in checkauthstatus function ', err)
        return res.status(500).json({ message: "Server Error Occurred" })
    }
}
module.exports = checkAuthStatus