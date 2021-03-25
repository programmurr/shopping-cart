import React, { useEffect } from 'react';
import ShopList from './ShopList';

function Shop(props) {
  useEffect(() => {
    const navBar = document.getElementById('stickyNav');
    const shop = document.getElementById('shopPage');
    let sticky;
    if (navBar) {
      sticky = navBar.offsetTop;
    }
  
    function myFunction() {
      if (window.pageYOffset >= sticky && shop) {
        shop.classList.add('expand');
        navBar.classList.add('sticky');
      } else {
        shop.classList.remove('expand');
        navBar.classList.remove('sticky');
      }
    }
  
    window.onscroll = function() {
      myFunction()
    }
  }, [])

  return (
      <div className="Shop" id="shopPage">
        <h2>Buy Drinks!</h2>
        <ShopList />
      </div>
  );
}

export default Shop;