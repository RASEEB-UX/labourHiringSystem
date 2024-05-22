const advertisementModel = require('../model/advertisementModel')
const addAdvertisement = async (req, res) => {
    try {
        if (!req.body.advertisement)
            return res.status(400).json({ message: "Advertisement Required" })
        const advertisement = await advertisementModel.create(req.body)
        const { _id, __v, ...essentialData } = advertisement.toObject()
        return res.status(200).json({ advertisement: essentialData })
    }
    catch (err) {
        console.log('err from advertisement controller add advertisement', err)
        return res.status(500).json({ message: "Server Error" })
    }
}
const removeAdvertisement = async (req,res) => {
    try {
        console.log('delete request is ',req.body)
        const deletedAdvertisement = await advertisementModel.findOneAndDelete({ _id: req.body.id })
        console.log(deletedAdvertisement)
        return res.status(200).json({ message: "Advertisement Deleted Successfully" })
    }
    catch (err) {
        console.log('errr in remover advertisement', err)
        return res.status(500).json({ message: "Server Error" })
    }
}
const getAdvertisement = async (req, res) => {
    try {
        const advertisement = await advertisementModel.find({}, { __v:0 })
        console.log(advertisement[0])
        return res.status(200).json({ advertisement: advertisement[0] })
    }
    catch (err) {
        console.log('err from get advertisement controller function', err)
        return res.status(500).json({ message: "Server Error" })
    }

}
module.exports = {
    addAdvertisement,
    getAdvertisement,
    removeAdvertisement
}