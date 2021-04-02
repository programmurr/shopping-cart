import React from 'react';
import { Link } from 'react-router-dom';

function Basket(props) {
  const { basket } = props;

  const handleRemove = (item) => () => {
    props.onRemove(item);
  }

  if (basket.length === 0) {
    return (
      <div className="EmptyBasket">
        <p>Empty Basket!</p>
      </div>
    )
  } else {
    return (
      <div className="Basket">
        {basket.map((item) => (
          <div key={item.currency}>
            <p>Currency: <Link to={`/shop/${item.currency}`}>{item.currency}</Link></p>
            <p>Rate: {item.rate.toFixed(2)}</p>
            <p>Amount: {item.amount}</p>
            <p>Total {item.currency}: {(item.rate * item.amount).toFixed(2)}</p>
            <button onClick={handleRemove(item)}>Remove</button>
          </div>
        ))}
      </div>
    );
  }
}

export default Basket;