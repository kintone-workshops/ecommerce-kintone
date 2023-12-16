// backend - server.js - Routes API requests from the frontend to Kintone

// Express Server Setup
import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv'
dotenv.config()
const PORT = 5000;
const app = express();

// Get Kintone credentials from a .env file
const subdomain = process.env.SUBDOMAIN;
const appID = process.env.APPID;
const apiToken = process.env.APITOKEN;

// Parse incoming requests with JSON payloads
app.use(express.json());

// Set Cross-Origin Resource Sharing (CORS) to frontend React App
app.use(cors());
const corsOptions = {
  origin: 'http://localhost:3000'
};

// Kintone's record(s) endpoints
const multipleRecordsEndpoint = `https://${subdomain}.kintone.com/k/v1/records.json?app=${appID}`
const singleRecordEndpoint = `https://${subdomain}.kintone.com/k/v1/record.json?app=${appID}`;

app.get('/getData', cors(corsOptions), async (req, res) => {
  const fetchOptions = {
    method: 'GET',
    headers: {
      'X-Cybozu-API-Token': apiToken
    }
  }
  console.log(fetchOptions)
  const response = await fetch(multipleRecordsEndpoint, fetchOptions);
  const jsonResponse = await response.json();
  console.log(jsonResponse)
  res.json(jsonResponse);
});
// This route executes when a PUT request lands on localhost:50000/putData
app.put('/putData', cors(corsOptions), async (req, res) => {
  const requestBody = {
    'app': appID,
    'id': req.id,
    'record': {
      'value': {
        'value': req.newCount
      }
    }
  };
  const options = {
    method: 'POST',
    headers: {
      'X-Cybozu-API-Token': apiToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody)
  }
  const response = await fetch(singleRecordEndpoint, options);
  const jsonResponse = await response.json();
  console.log(jsonResponse)
  res.json(jsonResponse);
});

app.listen(PORT, () => {
  console.log(`\n Backend server listening at http://localhost:${PORT} \n Confirm if Kintone records are being retrieved at \n http://localhost:${PORT}/getData`);
});