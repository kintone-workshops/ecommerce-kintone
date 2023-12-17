// backend - server.js - Routes API requests from the frontend to Kintone

// Express Server Setup
import express, { json } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv'
dotenv.config({
  path: '../../.env'
})
const PORT = 50000;
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

let checkItemStock = async () => {
// TODO!
}

let compareRequestAndStock = async (stock, request) => {
  // TODO. This one is hard!
}

// This route executes when a PUT request lands on localhost:50000/putData
app.put('/putData', cors(corsOptions), async (req, res) => {
  let itemStock = await checkItemStock();
  let filteredRequest = req.body.filter((item) => item.count >= 1)
  let itemsToUpdate = await compareRequestAndStock(itemStock.records, filteredRequest);

  if (itemsToUpdate.length != filteredRequest.length) {
    res.status(404).json({
      success: false,
      response: "not in stock"
    });
    return;
  }
  const requestBody = {
    'app': appID,
    'records': []
  };
  itemsToUpdate.forEach(item => {
    requestBody.records.push({
      'id': item.id,
      'record': {
        'count': {
          'value': item.count
        }
      }
    },)
  });
  const options = {
    method: 'PUT',
    headers: {
      'X-Cybozu-API-Token': apiToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody)
  }
  const response = await fetch(multipleRecordsEndpoint, options);
  const jsonResponse = await response.json();
  res.status(200).json({
    success: true,
    response: jsonResponse
  })
  return
});

app.listen(PORT, () => {
  console.log(`\n Backend server listening at http://localhost:${PORT} \n Confirm if Kintone records are being retrieved at \n http://localhost:${PORT}/putData`);
});