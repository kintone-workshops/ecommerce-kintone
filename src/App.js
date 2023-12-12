import { useState, useRef } from 'react';
import './App.css';
import Hero from './components/hero.js';
import Card from './components/card.js';
import Header from './components/header.js';
import productsList from './data/products.js';
import { Toaster } from 'react-hot-toast';

function App() {
  const dialogRef = useRef(null);
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

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };
  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <div className="App">
      <div><Toaster position="bottom-center" /></div>
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
        <button onClick={closeDialog}>close</button>
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
