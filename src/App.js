import './App.css';
import Hero from './components/hero.js';
import Card from './components/card.js';
import cartIcon from './assets/shopping-cart.png';
import productsList from './data/products.js';

function App() {
  return (
    <div className="App">
      <header className="header">
        <li><a href='/'>Home</a></li>
        <li><a href='/about'>About Us</a></li>
        <li><a href='https://kintone.dev/new'>go sign up for kintone</a></li>
        <div className='cartIcon'><button><img src={cartIcon}></img></button></div>
      </header>
      <div className='home'>
        <Hero />
        <div className='row'>
          {productsList.map((product, index) => {
            return (
              <Card key={index} productName={product.productName} img={product.productImage} />
            );
          })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
