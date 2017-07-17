import React from 'react';
import DisplayCase from './scenes/DisplayCase';
import CheckoutCounter from './scenes/CheckoutCounter';

const App = () => (
  <div className="wrapper">
    <div className="left-column">
      <DisplayCase />
    </div>
    <div className="right-column">
      <CheckoutCounter />
    </div>
  </div>
);

export default App;