import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
require('dotenv').config({ path: '../../../.env' });


function ItemDetail() {

  let { currency } = useParams();

  const currencyKey = process.env.REACT_APP_CURRENCY_API;

    return (
      <div className="ItemDetail">
        <p>Currency is {currency}</p>
      </div>
    );
}

export default ItemDetail;