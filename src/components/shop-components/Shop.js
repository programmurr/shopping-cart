import React from 'react';
import ShopList from './ShopList';

function Shop(props) {
  return (
      <div className="Shop" id="shopPage">
        <h2>Buy Drinks!</h2>
        <ShopList />
      </div>
  );
}

export default Shop;