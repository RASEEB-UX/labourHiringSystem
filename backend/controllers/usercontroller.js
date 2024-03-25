const usermodel = require('../model/usermodel');
const stripe = require('stripe')(`${process.env.stripysecretkey}`);
const cloudinary = require('cloudinary').v2
const usersController = async (req, res) => {
  try {
    const user = await usermodel.find().select('-_id -__v -photoid');
    res.status(200).json({ failure: false, user })

  }
  catch (err) {
    console.log(err)
    res.status(500).json({ failure: true, message: "oops something went wrong" })
  }
}
const registerController = async (req, res) => {
  try {
    const photo = req.files.photo.tempFilePath;
    //  console.log('photo is ', req.files.photo)
    const obj = await cloudinary.uploader.upload(photo)
    //console.log(obj)
    req.body.photo = obj.url;
    req.body.photoid = obj.public_id;
    const user = await usermodel.create(req.body)

    const d = await usermodel.findById(user._id).select('-_id-__v-photoid');
    // console.log("user created is", d)
    res.status(200).json({ failure: false, user })

  }
  catch (err) {
    console.log("err is ", err)
    res.status(500).json({ failure: true, message: "oops server issue happened" })
  }
}
const updateController = async (req, res) => {
  let publicId;
  try {
    const userAdhaar = req.body.adhaar;
    const newphoto = req.files.photo.tempFilePath;
    const user = await usermodel.findOne({ adhaar: userAdhaar });
    const userphotoid = user.photoid;
    const promise2 = cloudinary.uploader.destroy(userphotoid);
    const promise3 = cloudinary.uploader.upload(newphoto)
    const [cloudinaryResult, uploadedpic] = await Promise.all([promise2, promise3])
    ///console.log(cloudinaryResult) 
    //console.log(uploadedpic)
    //console.log(promise2)
    req.body.photo = uploadedpic.url;
    publicId = uploadedpic.public_id;
    req.body.photoid = publicId;
    const updateduser = await usermodel.findOneAndUpdate({ adhaar: user.adhaar }, req.body, { new: true ,projection:{_id:0,__v:0,photoid:0}})
    res.status(200).json({ success: true, user: updateduser })
  }
  catch (err) {
    console.log(err)
    if (publicId) {
      //if publicId means photo uploaded but database error occured so deleted uploaded pic here
      const delresponse = await cloudinary.uploader.destroy(publicId);
    }
    res.status(500).json({ sucess: false, message: "something went wrong" })
  }
  //const result = await cloudinary.uploader.destroy(publicId);


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