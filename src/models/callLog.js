class CallLog {
  constructor(callSid, status, responseText, recordingUrl) {
    this.callSid = callSid;
    this.status = status;
    this.responseText = responseText;
    this.recordingUrl = recordingUrl;
  }
}

module.exports = CallLog;