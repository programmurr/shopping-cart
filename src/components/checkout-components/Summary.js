import React, { useState, useEffect } from 'react';

function Summary(props) {
  const { basket } = props;

  const [ cost, setCost ] = useState(0);

  useEffect(() => {
    if (basket.length === 0) {
      setCost(0);
    } else {
      let amounts = [];
      basket.forEach(item => {
        amounts.push(item.amount);
      });
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const sum = amounts.reduce(reducer);      
      setCost(sum);
    }
  }, [basket])

  const handleBuy = () => {
    alert("You bought the currency! WHY?!")
  }


  return (
    <div className="Summary">
      <p>Total cost: £{cost}</p>
      <button onClick={handleBuy}>Buy</button>
    </div>
  );
}

export default Summary;