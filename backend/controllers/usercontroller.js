const usermodel = require('../model/usermodel')
const cloudinary = require('cloudinary').v2
const usersController = async (req, res) => {
    try {
        const user = await usermodel.find();
        res.status(200).json({ failure: false, user })

    }
    catch (err) {
        res.status(500).json({ failure: true, message: "oops something went wrong" })
    }
}
const registerController = async (req, res) => {
    try {
        const photo = req.files.photo.tempFilePath;
        console.log('photo is ', req.files.photo)
        const obj = await cloudinary.uploader.upload(photo)
        req.body.photo = obj.url;
        const user = await usermodel.create(req.body)
        
        const d=await usermodel.findById(user._id).select('-_id-__v');
        console.log("user created is",d)
        res.status(200).json({ failure: false, user })

    }
    catch (err) {
        console.log("err is ", err)
        res.status(500).json({ failure: true, message: "oops server issue happened" })
    }
}
const updateController = (req, res) => {
    res.send('updatecontroller')
}
module.exports = {
    usersController,
    registerController,
    updateController
}