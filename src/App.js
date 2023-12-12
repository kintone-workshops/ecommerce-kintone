import { useState } from 'react';

import './App.css';
import Hero from './components/hero.js';
import Card from './components/card.js';
import Cart from './components/cart.js';
import productsList from './data/products.js';
import { Toaster } from 'react-hot-toast';

function App() {

  const [cart, setCart] = useState({
    'Backpack': 0,
    'Waterbottle': 0,
    'Charger': 0
  })
  const [cartCount, setCartCount] = useState(0)

  let addToCart = (item) => {
    let cartCopy = cart;
    cartCopy[item] += 1;
    setCartCount(cartCount + 1);
    setCart(cartCopy);
    console.log(cart)
  }

  let startCheckout = () => {
    
  }
  return (
    <div className="App">
      <div><Toaster position="bottom-center" /></div>
      <header className="header">
        <li><a href='/'>Home</a></li>
        <li><a href='/about'>About Us</a></li>
        <li><a href='https://kintone.dev/new'>go sign up for kintone</a></li>
        <div className='cartDiv' onClick={startCheckout}>
          <div className='cartItemsCounter'>{cartCount}</div><Cart />
        </div>
      </header>
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
