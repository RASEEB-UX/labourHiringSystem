const Joi = require('joi');
const validator = (req, res, next) => {
  
    const schema = Joi.object({
        username: Joi.string().min(3).max(20).required(),
        mobile: Joi.string().pattern(/^[0-9]{10}$/).required(),
        age: Joi.number().integer().min(16).max(70).required(),
        area: Joi.string().min(3).max(20).required(),
        imagepath: Joi.string().max(587).required(),
        category: Joi.string().max(20).required(),
        password:Joi.string().required()
    });
    console.log('data received initially is ',req.body)
    console.log('file received is ',req.files);
    
    
     const photo =  (req.files!==undefined)?req.files.photo.tempFilePath :req.body.imagepath
    console.log('photo is from client ',photo)
    req.body.imagepath= photo
    console.log('modified response is',req.body)
    const { error } = schema.validate({ ...req.body});

    if (error) {
        console.log("err is joi error", error)
        return res.status(400).json({ message: "invalid input" })
    }
    next()

}
module.exports = validator