const express = require('express');
const callController = require('../controllers/callController');
const responseController = require('../controllers/responseController');

const router = express.Router();

router.post('/calls', callController.initiateCall);
router.post('/calls/response', responseController.handleResponse);

module.exports = router;