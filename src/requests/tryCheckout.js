// postRecord.js - Passes the POST API request from React to Express server
// Connect with the Express server
const endpoint = 'http://localhost:50000/putData';

export default async function tryCheckout(cartItems) {
  /* Pass the POST API request from React to Express server */
  // - - - - - - - START - - - - - - - -
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cartItems)
  }
  const response = await fetch(endpoint, options);
  const jsonResponse = await response.json();

  // The successful response from Kintone doesn't contain any information we'll use on the front-end.
  // So we'll just pass it back as JSON as is.
  return jsonResponse;
  // - - - - - - - END - - - - - - - - -
};