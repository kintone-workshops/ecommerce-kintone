import './App.css';
import Hero from './components/hero.js';
import Row from './components/row.js';
import Backpack from './assets/backpack.png';
import Waterbottle from './assets/waterbottle.png';
import Charger from './assets/charger.png';

let products = [Backpack, Waterbottle, Charger];

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className='home'>
        <Hero />
        <Row products={products}/>
        <Row products={products}/>
      </div>
    </div>
  );
}

export default App;
