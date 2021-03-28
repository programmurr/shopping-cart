import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route, 
  Link
} from 'react-router-dom';
import Home from './components/Home';
import Shop from './components/shop-components/Shop';
import Checkout from './components/checkout-components/Checkout';
import Footer from './components/Footer';

function App() {

  const [ basket, setBasket ] = useState([]);

  const handleSubmit = (currencyItem) => {
    const oldBasket = basket;
    const newBasket = oldBasket.concat(currencyItem);
    setBasket(newBasket);
  }

  return (    
    <Router>
      <div className="AppContent">
        <nav>
              <Link to="/shopping-cart/" id="HomeLink">Home</Link>
              <Link to="/shop" id="ShopLink">Shop</Link>
        </nav>
        <Switch>
          <Route exact path="/shopping-cart/">
            <Home />
          </Route>
          <Route path="/shop">
            <div className="StickyBar" id="stickyNav">
              <p>Items in Basket: {basket.length}</p>
              <Link to="/checkout">Checkout</Link>
            </div>
            <Shop 
              onSubmit={handleSubmit}
            />
          </Route>
          <Route path="/checkout">
            <Checkout basket={basket}/>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
