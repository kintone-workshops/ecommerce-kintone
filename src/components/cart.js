import '../App.css';
import cartIcon from '../assets/shopping-cart.png';

let Cart = () => {
  return (
    <div className='cartIcon'>
      <button>
        <img src={cartIcon}></img></button>
      </div>
  );
};

export default Cart;
