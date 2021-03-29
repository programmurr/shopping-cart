import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route, 
  Link
} from 'react-router-dom';
import Home from './components/Home';
import Shop from './components/shop-components/Shop';
import ItemDetail from './components/shop-components/ItemDetail';
import Checkout from './components/checkout-components/Checkout';
import Footer from './components/Footer';


function App() {

  const [ basket, setBasket ] = useState([]);

  // Checks to see if the current purchased item already exists in the cart
  // If it already exists, it adds to the existing amount
  // If not, it concatenates it on to the basket
  const handleSubmit = (newItem) => {
    const oldBasket = basket;
    let newBasket;

    if (oldBasket.length > 0) {
      const index = oldBasket.findIndex((oldItem) => (oldItem.currency === newItem.currency));
      if (index === -1) {
        newBasket = oldBasket.concat(newItem);
      } else {
        oldBasket[index].amount += newItem.amount;
        newBasket = oldBasket;
      }
    } else {
      newBasket = oldBasket.concat(newItem);
    }
    setBasket(newBasket);
  }

  const handleRemove = (removedItem) => {
    const oldBasket = basket;
    const newBasket = oldBasket.filter((item) => (item.currency !== removedItem.currency));
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
          <Route exact path="/shop">
            <div className="StickyBar" id="stickyNav">
              <p>Items in Basket: {basket.length}</p>
              <Link to="/checkout">Checkout</Link>
            </div>
            <Shop 
              onSubmit={handleSubmit}
            />
          </Route>
          <Route path="/shop/:currency" component={ItemDetail}/>
          <Route path="/checkout">
            <Checkout basket={basket} onRemove={handleRemove}/>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
