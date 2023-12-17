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
