const mongoose = require('mongoose')
require('dotenv').config()
const url="mongodb+srv://protonium789:ai9S5YrpICMHK8zM@labourhub.i319tk0.mongodb.net/?retryWrites=true&w=majority&appName=labourhub"
mongoose.connect(url).
    then(() => console.log("database connected"))
    .catch((err) => console.log("err from db file :",err))