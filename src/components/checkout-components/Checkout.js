import React from 'react';
import Basket from './Basket';
import Summary from './Summary';

function Checkout(props) {
  const { basket } = props; 

  const handleRemove = (item) => {
    props.onRemove(item);
  }
  
  return (
    <div className="Checkout">
      <h2>Checkout</h2>
      <Basket basket={basket} onRemove={handleRemove}/>
      <Summary basket={basket}/>
    </div>
  );
}

export default Checkout;