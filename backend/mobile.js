// Your AccountSID and Auth Token from console.twilio.com
const accountSid = process.env.twillioSid;
const authToken = process.env.twillioauthtoken;

const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'Hello from twilio-node',
    to: '+9797798243', // Text your number
    from: '+9797798243', // From a valid Twilio number
  })
  .then((message) => console.log(message.sid));