//importing things
var createError = require('http-errors');
var express = require('express');
var path = require('path');
const db = require('./db')
require('dotenv').config()
var cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet=require('helmet')
var usermodel = require('./model/usermodel')
const fileupload = require('express-fileupload')
const userRouter=require('./routes/userRoutes')
var app = express();
//app.use(helmet())
//import {v2 as cloudinary} from 'cloudinary';
const cloudinary = require('cloudinary').v2;
//importing complete
app.use(cookieParser());
app.use(fileupload({
  useTempFiles: true
}))

app.use(cors({
   credentials: true,
   origin:["http://localhost:5173"]//,"http://127.0.0.1:3000"],

 }))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

console.log(process.env.cloudapikey)
cloudinary.config({
  cloud_name:process.env.cloudname  ,
  api_key: process.env.cloudapikey,
  api_secret:process.env.cloudsecretkey
});
app.get('/',(req,res,next)=>{
res.send("it is working change url to /api/users/employees")

})
app.use('/api/users',userRouter)

function generateOTP() {

	// Declare a digits variable
	// which stores all digits 
	let digits=  '*@#!01a2b3c4567y8l9';
	let OTP = '';
	for (let i = 0; i < 6; i++) {
		OTP += digits[Math.floor(Math.random() * 10)];
	}
	return OTP;
}

console.log("OTP of 4 digits: ")
console.log(generateOTP());

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
//https://se-queue-joy-jeep.trycloudflare.com
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(8000, () => console.log('server started'))
module.exports = app;
//
/*
{
  "username":"saqlain",
  "email":"saqlain@gmail.com",
  "password":"12243234"
}

{
  "blogname":"java",
  "blogtitle":"java multithreading",
  "blogdesc":"multithreading leads to faster code execution",
  "email":"uzair@gmail.com"
}
*/
/*
{
  "username":"saqlain mushtaq",
  "mobile":9797798243,
  "adhaar":"123456789123",
  "age":23,
  "skills":"mason",
  "area":"zoonimar"
  
}
*/

