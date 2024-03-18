
const { number } = require('joi')
const mongoose = require('mongoose')
const schema = mongoose.Schema({
    username: {
        type: String,
        Required: true
    },
    adhaar:{
        type:String,
        Required:true
    },
    mobile:{
        type:String,
        Required:true
    },
    skills:{
        type:String,
        Required:true

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
    category:{
        type:String,
        Required:true
    }
    
   
})
module.exports=mongoose.model('useraccount',schema)