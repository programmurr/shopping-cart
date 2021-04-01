import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Shop(props) {
  const [ currencies, setCurrencies ] = useState({});
  const [ buyAmount, setBuyAmount ] = useState("");

  const handleChange = (e) => {
    setBuyAmount(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const input = form.querySelector('input');
    const amount = parseInt(buyAmount);
    const rate = Object.entries(currencies).filter(([currency, rate]) => (currency === input.id));

    if (buyAmount === "") {
      alert('Please enter a currency amount between 1 and 100 units');
      return;
    }
    props.onSubmit({
      currency: input.name,
      rate: rate[0][1],
      amount: amount
    });

    input.value = "";
    setBuyAmount("");
  }

  const handleScroll = (navBar, shop, sticky) => {
    if (window.pageYOffset >= sticky) {
      shop.classList.add('expand');
      navBar.classList.add('sticky');
    } else {
      shop.classList.remove('expand');
      navBar.classList.remove('sticky');
    }
  }

  const fetchCurrencies = async () => {
    await fetch(`https://api.frankfurter.app/latest?from=GBP`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Currency API Shop didn't work");
        }
      })
      .then((responseJson) => {
        const rates = responseJson.rates;
        setCurrencies(rates);
      })
      .catch((err) => {
        console.error(err);
      });;
  }

  useEffect(() => {
    const navBar = document.getElementById('stickyNav');
    const shop = document.getElementById('shopPage');
    const sticky = navBar.offsetTop;
  
    window.onscroll = () => { handleScroll(navBar, shop, sticky); }

    fetchCurrencies();
  }, [])

  

  return (
      <div className="Shop" id="shopPage">
        <h2>Buy Currency!</h2>
        <div className="ShopList">
        {Object.entries(currencies).map(([currency, rate]) => (
          currency === 'GBP' ? 
            <div key={currency} className="ShopItem" id="BaseCurrency">
              <p>Base Currency: {currency}</p>
              <p>Rate: {rate}.00</p>
            </div>
            : <form onSubmit={handleSubmit} key={currency} className="ShopItem">
                <Link to={`/shop/${currency}`}>Currency code: {currency}</Link>
                <p id="rate">Rate: {rate.toFixed(2)}</p>
                <label htmlFor={currency}>Amount (1-100 units)</label>
                <input 
                  type="number" 
                  id={currency} 
                  name={currency} 
                  min="1" 
                  max="100" 
                  amount={buyAmount}
                  onChange={handleChange}
                />
                <button>Buy!</button>
              </form>
        ))}
        </div>
      </div>
  );
}

export default Shop;