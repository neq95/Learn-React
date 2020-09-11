import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from './containers/Orders/Orders';

const INGREDIENTS_PRICE = {
  salad: 0.5,
  cheese: 0.7,
  meat: 1.6,
  bacon: 1
}

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route 
            path="/" 
            exact 
            render={(props) => <BurgerBuilder {...props} ingredientCost={INGREDIENTS_PRICE} />} 
          />
          <Route 
            path="/checkout" 
            render={(props) => <Checkout {...props} ingredientsPrice={INGREDIENTS_PRICE} />} 
          />
          <Route 
            path="/orders"
            component={Orders}
          />
        </Switch>
      </Layout>
    </Router>
  )
}

export default App;
