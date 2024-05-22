const userModel = require('../model/userModel')
const workerModel = require('../model/workerModel')
const feedbackModel = require('../model/feedbackModel')
const adminModel = require('../model/adminModel')
const addfeedback = async (req, res) => {
    let feedback = ''
    try {
        const { mobile, username, message } = req.body
        if (!mobile || !username || !message)
            return res.status(400).json({ message: "InSufficient Data" })
        const [userExists, workerExists,adminExists] = await Promise.all([
            userModel.findOne({ mobile: req.body.mobile }),
            workerModel.findOne({ mobile: req.body.mobile }),
            adminModel.findOne({mobile:req.body.mobile})
        ])
        feedback = await feedbackModel.create(req.body)
        return res.status(200).json({ message: "FeedBack Added Successfully" })
    }
    catch (err) {
        console.log('err from feedback controller add feedbacks', err)
        if (feedback) {
            const deletedFeedback = await feedbackModel.finOneAndDelete({ mobile: req.body.mobile })
            console.log('feedback deleted as some error occurred')
        }
        return res.status(500).json({ message: 'Server Error' })
    }
}
const deleteFeedback = async (req, res) => {
    try {
        if (!req.body.feedBackId)
            return res.status(400).json({ message: "FeedbackId Needed" })
        const deletedFeedback = await feedbackModel.findOneAndDelete({ _id: req.body.feedBackId })
        return res.status(200).json({ message: "Feedback Deleted Successfully" })

    }
    catch (err) {
        console.log('error from deletedfeedback controller err is', err)
        return res.status(500).json({ message: "Server Error" })
    }
}
const getAllFeedbacks = async (req, res) => {
    try {
        const feedback = await feedbackModel.find()
        return res.status(200).json({ feedbacks: feedback })
    }
    catch (err) {
        console.log('err in get all feedback function', err)
        return res.status(500).json({ message: "Server Error" })
    }
}
module.exports = {
    addfeedback,
    getAllFeedbacks,
    deleteFeedback
}