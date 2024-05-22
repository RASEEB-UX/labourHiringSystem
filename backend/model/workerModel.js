
const { number } = require('joi')
const mongoose = require('mongoose')
const schema = mongoose.Schema({
    username: {
        type: String,
        Required: true
    },
   
    mobile:{
        type:String,
        Required:true,
        unique:true
    },
    age:{
        type:Number,
        Required:true

    },
    area:{
        type:String,
        Required:true

    },
    photo:{
        type:String,
        Required:true

    },
    photoid:{
        type:String,
        Required:true

    },
    category:{
        type:String,
        Required:true
    },
    labourDocument:{
        type:String,
        Required:true

    },
    documentId:{
        type:String,
        Required:true

    },
    aadhaar:{
        type:String,
        Required:true
    },
    aadhaarId:{
        type:String,
        Required:true
    },
    userType:{
        type: String,
        Required: true
    },
    password:{
        type:String,
        Required:true
    }

    
   
})
module.exports=mongoose.model('workeraccount',schema)