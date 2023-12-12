import '../App.css';
import toast from 'react-hot-toast';

let Card = (props) => {
  return (
    <div className='card' onClick={() => {
      props.addToCart(props.productName)
      toast.success("Added to Cart!")
    }}>
      <p>{props.productName}</p>
      <img src={props.img} />
    </div>
  );
};

export default Card;
