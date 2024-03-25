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
app.use(helmet())
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

app.use('/api/users',userRouter)
//blog routes
//app.use('/api/blogs',blogRoutes)
//http://127.0.0.1:3000/api/users/employees
//ai9S5YrpICMHK8zM
//protonium789

//request handlers code ends here
// catch 404 and forward to error handler
// Function to generate OTP
function generateOTP() {

	// Declare a digits variable
	// which stores all digits 
	let digits = '*@#!01a2b3c4567y8l9';
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
clouidinary creadientials
cloud name:du7z0uvy8,
api-key:821644143447538,
api-secret:N0QaN0b0V6wSwcua56z59ndswXA,
api-env-variable:CLOUDINARY_URL=cloudinary://821644143447538:N0QaN0b0V6wSwcua56z59ndswXA@du7z0uvy8,
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
// Your AccountSID and Auth Token from console.twilio.com
// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
// const accountSid = "AC282affdd3ff0b44b9497a4bb77a08629";
// const authToken = "45db13c6e5526bc2cd2aa3928f161c43";
// const verifySid = "VAbb5d4c0b34f0271e0b3ada747d847b59";
// const client = require("twilio")(accountSid, authToken);

// client.verify.v2
//   .services(verifySid)
//   .verifications.create({ to: "+919797798243", channel: "sms" })
//   .then((verification) => console.log(verification.status))
//   .then(() => {
//     const readline = require("readline").createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });
//     readline.question("Please enter the OTP:", (otpCode) => {
//       client.verify.v2
//         .services(verifySid)
//         .verificationChecks.create({ to: "+919797798243", code: otpCode })
//         .then((verification_check) => console.log(verification_check.status))
//         .then(() => readline.close());
//     });
//   });
  // Your AccountSID and Auth Token from console.twilio.com
// const accountSid = process.env.twillioSid;
// const authToken = process.env.twillioauthtoken;

// const client = require('twilio')(accountSid, authToken);

// client.messages
//   .create({
//     body: 'Hello from twilio-node',
//     to: '+918493005166', // Text your number
//     from: '+919797798243', // From a valid Twilio number
//   })
//   .then((message) => console.log(message.sid));