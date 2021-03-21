import React from 'react';
import Basket from './Basket';
import Summary from './Summary';

function Checkout(props) {
  return (
    <div className="Checkout">
      <h2>Checkout</h2>
      <Basket />
      <Summary />
    </div>
  );
}

export default Checkout;