# Medication Reminder System

A voice-driven medication reminder system that integrates real-time communication technologies using Twilio, with Text-to-Speech (TTS) and Speech-to-Text (STT) capabilities to interact with patients about their medication schedules.

## Table of Contents

- [Features](#features)
- [System Architecture](#system-architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Call Flow](#call-flow)
- [Logging](#logging)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

## Features

- **Outbound Calls**: Trigger voice calls to patients via a REST API
- **Interactive Voice Response**: Use TTS to remind patients about medications
- **Speech Recognition**: Capture patient responses using STT
- **Voicemail Handling**: Leave messages when calls are unanswered
- **SMS Fallback**: Send text messages when voicemail is unavailable
- **Inbound Call Processing**: Handle patient callbacks
- **Call Logging**: Detailed console output for all interactions

## System Architecture

The system uses the following technologies:

- **Backend**: Node.js
- **Voice Communication**: Twilio
- **Speech-to-Text**: Deepgram
- **Text-to-Speech**: ElevenLabs
- **Local Development**: Ngrok for webhook tunneling
- **Environment Management**: dotenv for configuration

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Twilio account
- Deepgram account
- ElevenLabs account
- Ngrok (for local development)

### Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/medication-reminder.git
   cd medication-reminder
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   # Twilio Configuration
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   
   # Deepgram Configuration
   DEEPGRAM_API_KEY=your_deepgram_api_key
   
   # ElevenLabs Configuration
   ELEVENLABS_API_KEY=your_elevenlabs_api_key
   ELEVENLABS_VOICE_ID=your_preferred_voice_id
   
   # Server Configuration
   PORT=3000
   WEBHOOK_BASE_URL=your_ngrok_url_or_production_url
   ```

## Configuration

### Twilio Setup

1. Sign up for a [Twilio account](https://www.twilio.com/try-twilio)
2. Purchase a phone number with voice capabilities
3. Configure your Twilio phone number's voice webhook URL to point to your server's `/call/incoming` endpoint
4. Copy your Account SID and Auth Token to your `.env` file

### Deepgram Setup

1. Create a [Deepgram account](https://console.deepgram.com/signup)
2. Generate an API key with STT permissions
3. Add the API key to your `.env` file

### ElevenLabs Setup

1. Sign up for an [ElevenLabs account](https://beta.elevenlabs.io/sign-up)
2. Generate an API key
3. Choose a voice ID for your TTS
4. Add both to your `.env` file

### Ngrok Setup (for local development)

1. Install [Ngrok](https://ngrok.com/download)
2. Start Ngrok on your server port:
   ```
   ngrok http 3000
   ```
3. Update your `WEBHOOK_BASE_URL` in the `.env` file with the Ngrok URL
4. Update your Twilio phone number's voice webhook URL with the Ngrok URL

## Usage

### Starting the Server

```
npm start
```

### Making a Test Call

Use the following API endpoint to trigger a call:

```
POST /api/call
Content-Type: application/json

{
  "phoneNumber": "+1234567890"
}
```

Example using curl:

```
curl -X POST http://localhost:3000/api/call \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "+1234567890"}'
```

## API Documentation

### Endpoints

#### Trigger Outbound Call

```
POST /api/call
```

Request body:
```json
{
  "phoneNumber": "+1234567890"
}
```

Response:
```json
{
  "success": true,
  "callSid": "CA123456789",
  "status": "queued"
}
```

#### Get Call Logs (Bonus Feature)

```
GET /api/calls
```

Response:
```json
{
  "calls": [
    {
      "callSid": "CA123456789",
      "status": "completed",
      "patientResponse": "Yes, I have taken all my medications",
      "recordingUrl": "https://api.twilio.com/recordings/RE123456789",
      "timestamp": "2023-06-01T12:34:56Z"
    }
  ]
}
```

## Call Flow

1. **Outgoing Call**:
   - System calls patient using Twilio
   - TTS plays message: "Hello, this is a reminder from your healthcare provider to confirm your medications for the day. Please confirm if you have taken your Aspirin, Cardivol, and Metformin today."
   - STT captures patient response

2. **Unanswered Call Handling**:
   - If voicemail detected: Leave message "We called to check on your medication but couldn't reach you. Please call us back or take your medications if you haven't done so."
   - If no voicemail: Send SMS with similar message

3. **Patient Callback**:
   - When patient calls back, system plays the same TTS message
   - STT captures response

## Logging

After each call, the system logs the following information to the console:

```
Call SID: CA123456789
Status: answered
Patient Response: "Yes, I have taken all my medications today"
Timestamp: 2023-06-01T12:34:56Z
```

## Testing

Run the test suite with:

```
npm test
```

The tests cover:
- API endpoint functionality
- Call flow logic
- Error handling
- Integration with Twilio, Deepgram, and ElevenLabs

## Troubleshooting

### Common Issues

1. **Webhook Not Receiving Calls**:
   - Verify Ngrok is running and the URL is correct in Twilio
   - Check server logs for any errors
   - Ensure your server is listening on the correct port

2. **TTS/STT Not Working**:
   - Verify API keys are correct in your `.env` file
   - Check network connectivity to the respective services
   - Review service quotas and limits

3. **Call Not Being Placed**:
   - Verify Twilio account has sufficient funds
   - Check that the phone number format is correct (E.164 format)
   - Review Twilio logs for any error messages

For additional support, please open an issue on the GitHub repository.
