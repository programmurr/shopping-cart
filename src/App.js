import React from 'react';
import Navbar from './components/NavBar';
import Home from './components/Home';
import Shop from './components/shop-components/Shop';
import Checkout from './components/checkout-components/Checkout';
import Footer from './components/Footer';

function App() {
  return (    
    <div className="AppContent">
      <Navbar />
      <Home />
      <Shop />
      <Checkout />
      <Footer />
    </div>
  );
}

export default App;
