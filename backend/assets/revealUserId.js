const crypto = require('crypto')
const getMachineId= require('node-machine-id')
const giveUserId = async (browserInfo) => {
    try {
        const { source, browser, version, os, platform, geoIp, isMobile, isWindows, isLinux, isLinux64 } = browserInfo
        const machineUniqueId= await getMachineId.machineId()
        console.log('mac address is',machineUniqueId)
        const userData = JSON.stringify({ source, browser, version, os, platform, geoIp, isMobile, isWindows, isLinux, isLinux64,machineUniqueId })
        return crypto.createHash('sha256').update(userData).digest('hex');
    }
    catch (err) {
       throw new Error(err)
    }
}
module.exports = giveUserId
