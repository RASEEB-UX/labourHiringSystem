const Joi = require('joi');
const validator = (req, res, next) => {
  
    const schema = Joi.object({
        username: Joi.string().min(3).max(20).required(),
        mobile: Joi.string().pattern(/^[0-9]{10}$/).required(),
        adhaar: Joi.string().pattern(/^[0-9]{12}$/).required(),
        age: Joi.number().integer().min(15).max(70).required(),
        skills: Joi.string().min(3).max(23).required(),
        area: Joi.string().min(3).max(23).required(),
        photo: Joi.string().max(87).required(),
        category: Joi.string().max(20).required()

    });
    const photo = req.files?.photo?.tempFilePath
    const { error } = schema.validate({ ...req.body, photo });

    if (error) {
        console.log("err", error)
        return res.status(400).json({ message: "invalid input" })
    }
    next()

}
module.exports = validator