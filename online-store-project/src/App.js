import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './Comṕonents/Home';
import ShoppingCart from './Comṕonents/ShoppinhgCart';
import ProductDetails from './Comṕonents/ProductDetails';
import Checkout from './Comṕonents/Checkout';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              path="/product/details/:id"
              component={ ProductDetails }
            />
            <Route
              path="/checkout"
              component={ Checkout }
            />
            <Route
              path="/shoppingcart"
              component={ ShoppingCart }
            />
            <Route
              exact
              path="/"
              component={ Home }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
