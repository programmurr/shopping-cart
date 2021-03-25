import React, { useEffect, useState } from 'react';
require('dotenv').config({ path: '../../../.env' });

// Add number for amount input next
// Should style it too
function Shop(props) {
  const currencyKey = process.env.REACT_APP_CURRENCY_API

  const [ currencies, setCurrencies ] = useState({});

  const handleScroll = (navBar, shop, sticky) => {
    if (window.pageYOffset >= sticky) {
      shop.classList.add('expand');
      navBar.classList.add('sticky');
    } else {
      shop.classList.remove('expand');
      navBar.classList.remove('sticky');
    }
  }

  useEffect(() => {
    const navBar = document.getElementById('stickyNav');
    const shop = document.getElementById('shopPage');
    const sticky = navBar.offsetTop;
  
    window.onscroll = () => { handleScroll(navBar, shop, sticky); }

    fetchCurrencies();
  }, [])

  const fetchCurrencies = async () => {
    const data = await fetch (`https://v6.exchangerate-api.com/v6/${currencyKey}/latest/GBP`);
    const allCurrencies = await data.json();
    const rates = allCurrencies.conversion_rates;
    setCurrencies(rates);
  }

  return (
      <div className="Shop" id="shopPage">
        <h2>Buy Currency!</h2>
        <div className="ShopList">
        {Object.entries(currencies).map(([currency, rate]) => (
          currency === 'GBP' ? 
            <div key={currency} className="ShopItem" id="BaseCurrency">
              <p>Base Currency: {currency}</p>
              <p>Rate: {rate}.00</p>
              <button>Buy!</button>
            </div>
            : <div key={currency} className="ShopItem">
                <p>Currency code: {currency}</p>
                <p>Rate: {rate}</p>
                <button>Buy!</button>
              </div>
        ))}
        </div>
      </div>
  );
}

export default Shop;