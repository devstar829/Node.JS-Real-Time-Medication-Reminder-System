exports.handleError = (error, res) => {
  console.error(`[ERROR]: ${error.message}`);
  res.status(500).json({ error: 'An internal server error occurred' });
};