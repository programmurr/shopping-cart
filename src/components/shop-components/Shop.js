import React from 'react';
import ShopList from './ShopList';
import StickyBar from './StickyBar';

function Shop(props) {
  return (
    <div className="Shop">
      <StickyBar />
      <h2>Buy Drinks!</h2>
      <ShopList />
    </div>
  );
}

export default Shop;