import '../App.css';

let cardModal = () => {
  return (
    <dialog>
      <button autofocus>Close</button>
      <p>Add to Cart?</p>
      <button>Yes</button>
    </dialog>
  )
}

let Card = (props) => {
  return (
    <div className='card' onClick={null}>
      <p>{props.productName}</p>
      <img src={props.img} />
    </div>
  );
};

export default Card;
