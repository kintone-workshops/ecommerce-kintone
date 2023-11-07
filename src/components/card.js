import '../App.css';

let Card = (props) => {
  return (
    <div className='card'>
      <p>Product</p>
      <img src={props.img}/>
    </div>
  );
};

export default Card;
