const workerModel = require('../model/workerModel')
const pendingRequestsModel = require('../model/pendingRequestsModel')
const adminModel = require('../model/adminModel')
const pendingRequestModel = require('../model/pendingRequestsModel')
const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary').v2
const registerRequest = async (req, res) => {
    let obj;//variable to store cloudinary uploaded photo
    let photo;
    let documentTempVar;//variable to store cloudinary uploaded labourcard
    let aadhaarTempVar;//variable to store cloudinary uploaded aadhaarphoto
    let userDocument;//variable to store user document created in mongodb
    try {
        //console.log('photo is ',req.files.photo
        if (!req.files?.labourDocument && !req.body.labourDocument)
            return res.status(400).json({ message: "valid document required" })
        if (!req.files?.aadhaar && !req.body.aadhaar)
            return res.status(400).json({ message: "valid aadhaar document required" })
        const [mobileExistsInUserDb, mobileExistsInWorkerDb, mobileExistsInPendingdb, mobileExistsInAdminDb] = await Promise.all([
            userModel.findOne({ mobile: req.body.mobile }),
            workerModel.findOne({ mobile: req.body.mobile }),
            pendingRequestModel.findOne({ mobile: req.body.mobile }),
            adminModel.findOne({ mobile: req.body.mobile })
        ])
        if (mobileExistsInUserDb || mobileExistsInWorkerDb || mobileExistsInPendingdb || mobileExistsInAdminDb)
            return res.status(403).json({ failure: true, message: "this mobile already exists" })

        if (req.files) {

            photo = req.files.photo.tempFilePath;
            req.body.labourDocument = req.files.labourDocument.tempFilePath
            req.body.aadhaar = req.files.aadhaar.tempFilePath
            console.log('aadhaar received is', req.body.aadhaar)
            obj = await cloudinary.uploader.upload(photo)
            documentTempVar = await cloudinary.uploader.upload(req.body.labourDocument)
            aadhaarTempVar = await cloudinary.uploader.upload(req.body.aadhaar),
                console.log('passed')
            //console.log(obj)
            req.body.photo = obj.secure_url;
            req.body.photoId = obj.public_id;
            req.body.documentId = documentTempVar.public_id;
            req.body.labourDocument = documentTempVar.secure_url
            req.body.aadhaar = aadhaarTempVar.secure_url;
            req.body.aadhaarId = aadhaarTempVar.public_id
        }
        else {
            req.body.photo = req.body.imagepath
            req.body.photoId = null
            req.body.labourDocument = req.body.labourDocument
            req.body.aadhaar = req.body.aadhaar
            req.body.aadhaarId = null
            req.body.documentId = null
        }
        //  console.log('photo is ', photo)
        req.body.userType='worker'
        req.body.password = await bcrypt.hash(req.body.password, 10)
        userDocument = await pendingRequestsModel.create(req.body);

        return res.status(200).json({ message: "user document submitted for registration" })


    }
    catch (err) {
        if (userDocument) {
            const deletedUser = await pendingRequestsModel.finOneAndDelete({ mobile: req.body.mobile });
            console.log('deleted user succesfully')
        }
        if (obj) {
            console.log("deleted asset")
            const delresponse = await cloudinary.uploader.destroy(req.body.photoid);
            console.log(delresponse)
        }
        if (documentTempVar) {
            console.log("deleted uploaded labour document as some error occured in controller")
            const delresponse = await cloudinary.uploader.destroy(req.body.documentId);
            console.log(delresponse)
        }
        console.log("err is from pendingrequestcontroller ", err)
        res.status(500).json({ failure: true, message: "oops server issue happened" })
    }
}
const rejectRequest = async (req, res) => {
    try {
        if (!req.body.userPhoneNumber)
            return res.status(400).json({ message: "worker phone number required" })
        const worker = await pendingRequestsModel.findOne({ mobile: req.body.userPhoneNumber })
        const [deletedPhoto, deletedDocument, deletedAadhaarCard] = await Promise.all([
            cloudinary.uploader.destroy(worker.photoId),
            cloudinary.uploader.destroy(worker.documentId),
            cloudinary.uploader.destroy(worker.aadhaarId)
        ])
        console.log('assets of rejected worker deleted successfully')
        const deletedWorker = await pendingRequestsModel.findOneAndDelete({ mobile: req.body.userPhoneNumber })
        return res.status(200).json({ message: "worker deleted successfully" })
    }
    catch (err) {
        console.log('error in pendingrequests controller reject request', err)
        return res.status(500).json({ message: "server error occurred" })
    }

}
const getAllRequests = async (req, res) => {
    try {
        const data = await pendingRequestsModel.find({}, { _id: 0, __v: 0, photoId: 0, documentId: 0, aadhaarId: 0 })
        return res.status(200).json({ pendingRequests: data })
    }
    catch (err) {
        console.log('err in pending requests controller get allrequests', err)
        return res.status(500).json({ message: "oops server error occurred" })
    }
}
const approveRequest = async (req, res) => {
    let approvedWorker = ''
    try {
        if (!req.body.userPhoneNumber)
            return res.status(400).json({ message: "user phone number required" })
        const worker = await pendingRequestsModel.findOne({ mobile: req.body.userPhoneNumber })
        const { _id, __v, ...necessaryData } = worker.toObject()
        approvedWorker = await workerModel.create(necessaryData)
        const deletedPendingWorker = await pendingRequestsModel.findOneAndDelete({ mobile: worker.mobile })
        const { photoId, documentId, aadhaarId, aadhaar, labourDocument, ...workeNecessaryInfo } = deletedPendingWorker.toObject()
        console.log('pending worker deleted and shifted to new database user was', worker)
        return res.status(200).json({ user: workeNecessaryInfo })
    }
    catch (err) {
        console.log('error in pending requests controller approve request', err)
        if (approvedWorker) {
            const deletedWorker = await workerModel.findOneAndDelete({ mobile: approvedWorker.mobile })
            console.log('worker deleted successfully')
        }
        return res.status(500).json({ message: " server error occurred" })
    }
}
module.exports = {
    rejectRequest,
    registerRequest,
    getAllRequests,
    approveRequest
}