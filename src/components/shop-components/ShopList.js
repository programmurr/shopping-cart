import React from 'react';
import shopItems from './shopItems.json';
import Guinness from '../../img/guinness.jpg';
import Whiskey from '../../img/cocktail.jpeg';
import Lager from '../../img/lager.jpeg';
import Cocktail from '../../img/cocktail.jpeg';
import Coffee from '../../img/coffee.jpeg';
import Water from '../../img/water.jpeg';
import Milk from '../../img/milk.jpeg';


function ShopList(props) {
  const imgArray = [
    Guinness,
    Whiskey,
    Lager,
    Cocktail,
    Coffee,
    Water,
    Milk
  ];

  return (
    <div className="ShopList">
      {shopItems.map((item, index) => (
        <div key={item.id} className="ShopItem">
          <h3>{item.name}</h3>
          <img src={imgArray[index]} alt={item.name}/>
          <p>{item.price}</p>
          <button>Buy</button>
        </div>
      ))}
    </div>
  );
}

export default ShopList;