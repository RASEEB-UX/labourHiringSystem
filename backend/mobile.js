// Your AccountSID and Auth Token from console.twilio.com
  let digits = '0835478612';
  let otpNumber = '';
  for (let i = 0; i < 6; i++) {
      otpNumber += digits[Math.floor(Math.random() * 10)];
  }
  console.log('otp is',num)

