import { useState, useRef } from 'react';
import './App.css';
import Hero from './components/hero.js';
import Card from './components/card.js';
import Header from './components/header.js';
import productsList from './data/products.js';
import { Oval } from  'react-loader-spinner'
import { Toaster } from 'react-hot-toast';

function App() {
  const dialogRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([{
    Backpack: {
      count: 0
    },
    Waterbottle: {
      count: 0
    },
    Charger: {
      count: 0
    }
  }])
  const [cartCount, setCartCount] = useState(0)

  let addToCart = (item) => {
    let cartCopy = cart;
    cartCopy[0][item].count += 1;
    setCartCount(cartCount + 1);
    setCart(cartCopy);
    console.log(cart)
  }

  let startCheckout = () => {
    openDialog()
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
            <div key="key">
              <p>Backpacks: {item.Backpack.count}</p>
              <p>Waterbottles: {item.Waterbottle.count}</p>
              <p>Chargers: {item.Charger.count}</p>
            </div>
          )
        })}
        <button onClick={closeDialog}>Checkout</button>
      </dialog>
      <Header startCheckout={startCheckout} cartCount={cartCount} />
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
