
const mongoose = require('mongoose')
const schema = mongoose.Schema({
    username: {
        type: String,
        Required: true
    },
    age: {
        type: Number,
        Required: true
    },
    email: {
        type: String,
        Required: true
    },
    photo: {
        type: String,
        Required: true
    },
    photoId: {
        type: String,
        Required: true
    },
    address: {
        type: String,
        Required: true
    },
    mobile: {
        type: Number,
        Required: true
    },
    gender:{
        type: String,
        Required: true
    },
    password:{
        type: String,
        Required: true
    },
    userType:{
        type: String,
        Required: true
    }
})
module.exports=mongoose.model('adminCollection',schema)