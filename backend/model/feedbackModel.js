const mongoose=require('mongoose')
const schema=mongoose.Schema({
    username:{
        type:String,
        Required:true
    },
    mobile:{
        type:String,
        Required:true
    },
    message:{
        type:String,
        Required:true
    }
})
module.exports=mongoose.model('feedbackCollection',schema)