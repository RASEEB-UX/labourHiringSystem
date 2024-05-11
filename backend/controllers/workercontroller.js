const workerModel = require('../model/workerModel');
const stripe = require('stripe')(`${process.env.stripysecretkey}`);
const cloudinary = require('cloudinary').v2
const usersController = async (req, res) => {
  try {
    const user = await workerModel.find().select('-_id -__v -photoid');
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
    //console.log('photo is ',req.files.photo
    const mobileExists = await workerModel.findOne({ mobile: req.body.mobile })
    if (mobileExists)
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
const updateController = async (req, res) => {
  try {
    const userMobile = req.body.mobile;
    console.log(req.body)
    let user = await workerModel.findOne({ mobile: userMobile });
    user = user.toObject()
    const newUpdatedUser = await workerModel.findOneAndUpdate({ mobile: req.body.mobile }, {
      ...user,
      area: req.body.area,
      age: req.body.age,
      category: req.body.category,
      mobile: req.body.mobile
    }, { new: true })
    res.status(200).json({ success: true, user: newUpdatedUser })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ sucess: false, message: "something went wrong" })
  }
}
const checkoutController = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'Laborer Registration Fee',
            },
            unit_amount: 10000, // Amount in cents (100 rupees)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });

    res.json({ session: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message, error });
  }
}
module.exports = {
  usersController,
  registerController,
  updateController,
  checkoutController
}