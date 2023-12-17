# Completed Version of server.js

```js
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
  const fetchOptions = {
    method: 'GET',
    headers: {
      'X-Cybozu-API-Token': apiToken
    }
  }
  const response = await fetch(multipleRecordsEndpoint, fetchOptions);
  return response.json();
}

let compareRequestAndStock = async (stock, request) => {
  let validItems = [];
  request.forEach(requestedItem => {
    let stockItem = stock.find((item) => item.Record_number.value === requestedItem.id.toString())
    if (stockItem.count.value >= requestedItem.count) {
      let newItem = requestedItem;
      newItem.count = stockItem.count.value - requestedItem.count;
      validItems.push(newItem)
    }
  });
  return validItems;
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
```

# Completed Version of App.js
```js
import { useState, useRef } from 'react';
import './App.css';
import Hero from './components/hero.js';
import Card from './components/card.js';
import Header from './components/header.js';
import productsList from './data/products.js';
import { Oval } from 'react-loader-spinner'
import { Toaster } from 'react-hot-toast';
import Confetti from 'react-confetti'
import tryCheckout from './requests/tryCheckout.js';

function App() {
  const dialogRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(productsList)
  const [cartCount, setCartCount] = useState(0)
  const [isSuccess, setIsSuccess] = useState(false);

  let addToCart = (selectedItem) => {
    let cartCopy = cart;
    cartCopy.forEach(cartObject => {
      if (cartObject.productName == selectedItem) {
        cartObject.count += 1;
        setCartCount(cartCount + 1);
      }
    });
    setCart(cartCopy);
  }

  let startCheckout = async () => {
    closeDialog()
    try {
      let checkoutTry = await tryCheckout(cart);
      if (checkoutTry.success === true) {
        setLoading(false);
        setIsSuccess(true);
        setCart(productsList);
        setCartCount(0)
      } else {
        setLoading(false);
        console.log("failure!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  let toggleLoading = () => {
    setLoading(!loading);
  }

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };
  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    toggleLoading()
  };

  return (
    <div className="App">
      <div><Toaster position="bottom-center" /></div>
      {isSuccess ? <Confetti /> : null}
      <Oval
        height={80}
        width={80}
        color="#4fa94d"
        visible={loading}
        wrapperClass="loader" />
      <dialog ref={dialogRef}>
        <h2>Checkout</h2>
        {cart.map(item => {
          return (
            <div key={item.id}>
              <p>{item.productName}: {item.count}</p>
            </div>
          )
        })}
        {cart.some(element => element.count >= 1) ? (
          <button onClick={startCheckout}>Checkout</button>
        ) : (
          <button disabled onClick={closeDialog}>No Items in Cart!</button>
        )}
      </dialog>
      <Header startCheckout={openDialog} cartCount={cartCount} />
      <div className='home'>
        <Hero />
        <div className='row'>
          {productsList.map((product, index) => {
            return (
              <Card key={index} productName={product.productName} img={product.productImage} addToCart={addToCart} />
            );
          })
          }
        </div>
      </div>
    </div>
  );
}

export default App;

```