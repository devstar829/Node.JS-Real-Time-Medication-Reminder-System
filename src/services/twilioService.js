const twilio = require('twilio');
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = require('../config/config');

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

exports.makeCall = (phoneNumber) => {
  return client.calls.create({
    to: phoneNumber,
    from: TWILIO_PHONE_NUMBER,
    url: 'http://demo.twilio.com/docs/voice.xml' // Replace with your TwiML URL
  }).then(call => call.sid);
};