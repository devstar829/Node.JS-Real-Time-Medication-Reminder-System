exports.handleResponse = (req, res) => {
  const { callSid, responseText } = req.body;
  // Logic to process and log the response
  console.log(`Response for Call SID ${callSid}: ${responseText}`);
  res.status(200).json({ message: 'Response recorded successfully' });
};