// backend - server.js - Routes API requests from the frontend to Kintone

// Express Server Setup
import express from 'express';
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
const singleRecordEndpoint = `https://${subdomain}.kintone.com/k/v1/record.json?app=${appID}`;

let checkItemStock = async () => {
  const fetchOptions = {
    method: 'GET',
    headers: {
      'X-Cybozu-API-Token': apiToken
    }
  }
  console.log(fetchOptions)
  const response = await fetch(multipleRecordsEndpoint, fetchOptions);
  return response.json();
}

let compareRequestAndStock = async (stock, request) => {
  request.forEach(requestedItem => {
    let stockItem = stock.find((item) => item.Record_number.value === requestedItem.id.toString())
    if (stockItem.count.value < requestedItem.count) {
      return false;
    }
  });
}

// This route executes when a PUT request lands on localhost:50000/putData
app.put('/putData', cors(corsOptions), async (req, res) => {

  let itemStock = await checkItemStock();
  let filteredRequest = req.body.filter((item) => item.count >= 1)

  if (compareRequestAndStock(itemStock.records, filteredRequest)) {
    console.log("In Stock!");
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
      method: 'PUT',
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
  } else {
    console.log("Not Enough in Stock");
  }

});

app.listen(PORT, () => {
  console.log(`\n Backend server listening at http://localhost:${PORT} \n Confirm if Kintone records are being retrieved at \n http://localhost:${PORT}/putData`);
});