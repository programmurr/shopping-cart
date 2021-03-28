import React from 'react';

function Basket(props) {
  const { basket } = props;

  return (
    <div className="Basket">
      {basket.map((item) => (
        <div key={item.currency}>
          <p>Currency: {item.currency}</p>
          <p>Rate: {item.rate.toFixed(2)}</p>
          <p>Amount: {item.amount}</p>
          <p>Total {item.currency}: {(item.rate * item.amount).toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}

export default Basket;