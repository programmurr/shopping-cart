import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format, compareAsc, subDays } from 'date-fns';
import parseISO from 'date-fns/parseISO'

function ItemDetail(props) {
  let { currency } = useParams();
  const today = format(new Date(), 'yyyy-MM-dd');
  const lastWeek = format(subDays(new Date(), 8), 'yyyy-MM-dd');
  const [ historyRates, setHistoryRates ] = useState({});
  const [ buyAmount, setBuyAmount ] = useState("");

  const fetchItem = async () => {
    await fetch(
      `https://api.frankfurter.app/${lastWeek}..${today}?from=GBP&to=${currency}`
    )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Currency API ItemDetail didn't work");
      }
    })
    .then((responseJson) => {
      // There is a better way of doing this out there somewhere, but it's beyond me.
      // responseJson.rates is a nested Object. It arrives in date order, but iterating
      // over it with Object.entries() throws everything off (WHY?!). So I made the below 
      // monstrous transformation to un-nest the responseJson.rates, sort the dates, 
      // put them in an array to keep them in order, then find the corresponding rate and 
      // pair them together in the dateArray. There's probably some show-off out there who
      // can do it in one line. I DON'T CARE.
      const rateArray = Object.entries(responseJson.rates).map(([date, rateObj]) => (
        {[date]: rateObj[currency]}
      ));

      const dateArray = Object.keys(responseJson.rates)
        .map((date) => (parseISO(date)))
        .sort(compareAsc)
        .map((date) => (format(date, 'yyyy-MM-dd')))
        .map((date) => (
          [date, ""]
        ));

      for (let i = 0; i < dateArray.length; i++) {
        for (let j = 0; j < rateArray.length; j++) {
          const rateObj = rateArray[j];
          const keys = Object.keys(rateObj);
          if (dateArray[i][0] === keys[0]) {
            dateArray[i][1] = rateObj[dateArray[i][0]]
          }
        }
      }
      setHistoryRates(dateArray);
      })
      .catch((err) => {
        console.error(err);
      });
    }

  useEffect(() => {
    fetchItem();
  }, [])


    const handleChange = (e) => {
      setBuyAmount(e.target.value);
    }

    const handleSubmit = (e) => {
      e.preventDefault();

      const form = e.target;
      const input = form.querySelector('input');
      const amount = parseInt(buyAmount);
      const rate = historyRates[historyRates.length -1][1];

      if (buyAmount === "") {
        alert('Please enter a currency amount between 1 and 100 units');
        return;
      }
      props.onSubmit({
        currency: input.name,
        rate: rate,
        amount: amount
      });
  
      input.value = "";
      setBuyAmount("");
    }

    if (historyRates.length > 0) {
      return (
        <div className="ItemDetail" id="itemPage">
          <h1>GBP to {currency}</h1>
          <h2>Previous 7 Working Days</h2>
          <div className="CurrencyRates">
            {historyRates.map((rate) => (
              <div key={rate[0]} className="RateDate">
                <p>Date: {rate[0]}</p>
                <p>Rate: {rate[1]}</p>
              </div>
            ))}
          </div>
          <div className="BuyItem">
            <h3>Buy Here!</h3>
            <p>The current rate is 1GBP = {historyRates[historyRates.length -1][1]} {currency}</p>
            <form onSubmit={handleSubmit}>
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
          </div>
        </div>
      )
    } else {
      return (
        <div id="itemPage">
          <p id="LoadingItem">Loading...</p>
        </div>
      );
    }
}

export default ItemDetail;