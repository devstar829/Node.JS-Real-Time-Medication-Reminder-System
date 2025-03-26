const twilioService = require('../services/twilioService');

exports.initiateCall = (req, res) => {
  const { phoneNumber } = req.body;
  twilioService.makeCall(phoneNumber)
    .then(callSid => res.status(200).json({ message: 'Call initiated successfully', callSid }))
    .catch(error => res.status(400).json({ error: error.message }));
};