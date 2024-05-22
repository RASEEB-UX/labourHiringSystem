const mongoose = require('mongoose')
const schema=mongoose.Schema({
    advertisement:{
        type:String,
        Required:true
    }
})
const advertisementModel=mongoose.model("advertisementdb",schema)
module.exports=advertisementModel