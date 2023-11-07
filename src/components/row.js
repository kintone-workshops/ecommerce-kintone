import '../App.css';
import Card from './card.js';

let Row = (props) => {
  return (
    <div className='row'>
      {props.products.map((product, index) => {
        return (
          <Card img={product} />
        );
      })
      }
    </div>
  );
};

export default Row;
