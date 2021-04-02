import React from 'react';
import { Link } from 'react-router-dom';

export default function StickyBar(props) {
  return (
    <div className="StickyBar" id="stickyNav">
      <p>Items in Basket: {props.basketLength}</p>
      <Link to="/checkout">Checkout</Link>
    </div>
  )
}