# API Documentation

## Overview

This document provides details on the API endpoints for the Medication Reminder System. The API allows you to trigger voice calls to patients, handle responses, and log call data.

## Base URL

The base URL for all API requests is: `http://localhost:3000/api`

## Endpoints

### 1. Trigger a Voice Call

- **Endpoint**: `/calls`
- **Method**: `POST`
- **Description**: Initiates a voice call to a patient with a medication reminder message.
- **Request Body**:
  ```json
  {
    "phoneNumber": "+1234567890"
  }
  ```
- **Response**:
  - **Success**: `200 OK`
    ```json
    {
      "message": "Call initiated successfully",
      "callSid": "CA1234567890abcdef"
    }
    ```
  - **Error**: `400 Bad Request`
    ```json
    {
      "error": "Invalid phone number"
    }
    ```

### 2. Handle Incoming Call Response

- **Endpoint**: `/calls/response`
- **Method**: `POST`
- **Description**: Handles the response from a patient during a call.
- **Request Body**:
  ```json
  {
    "callSid": "CA1234567890abcdef",
    "responseText": "Yes, I have taken my medications."
  }
  ```
- **Response**:
  - **Success**: `200 OK`
    ```json
    {
      "message": "Response recorded successfully"
    }
    ```
  - **Error**: `400 Bad Request`
    ```json
    {
      "error": "Invalid call SID"
    }
    ```

### 3. Retrieve Call Logs

- **Endpoint**: `/logs`
- **Method**: `GET`
- **Description**: Retrieves a list of all call logs.
- **Response**:
  - **Success**: `200 OK`
    ```json
    [
      {
        "callSid": "CA1234567890abcdef",
        "status": "completed",
        "responseText": "Yes, I have taken my medications.",
        "recordingUrl": "http://twilio.com/recordings/CA1234567890abcdef"
      }
    ]
    ```
  - **Error**: `500 Internal Server Error`
    ```json
    {
      "error": "Unable to retrieve call logs"
    }
    ```

## Authentication

Currently, the API does not require authentication. However, it is recommended to implement authentication for production environments.

## Error Handling

All error responses will include an `error` field with a descriptive message. Ensure to handle these errors appropriately in your client application.

## Testing

Use tools like Postman or Curl to test the API endpoints. Ensure your server is running locally before making requests.

## Notes

- Ensure that the phone numbers provided are in E.164 format.
- The system logs call data to the console for debugging purposes.

For further assistance, please refer to the README file or contact the development team.