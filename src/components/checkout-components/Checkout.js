import React from 'react';
import Basket from './Basket';
import Summary from './Summary';

function Checkout(props) {
  const { basket } = props; 

  return (
    <div className="Checkout">
      <h2>Checkout</h2>
      <Basket basket={basket}/>
      <Summary basket={basket}/>
    </div>
  );
}

export default Checkout;