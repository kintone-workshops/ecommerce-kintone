import '../App.css';
import Cart from './cart';
let Header = (props) => {
  return (
    <header className="header">
      <li><a href='/'>Home</a></li>
      <li><a href='/about'>About Us</a></li>
      <li><a href='https://kintone.dev/new'>go sign up for kintone</a></li>
      <div className='cartDiv' onClick={props.startCheckout}>
        <div className='cartItemsCounter'>{props.cartCount}</div>
        <Cart />
      </div>
    </header>
  );
};

export default Header;
