import './css/main.css';
import './css/componentStyles.css';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import CurrencyConverter from './components/CurrencyConverter';
import CurrencyList from './components/CurrencyList';
import UserProfile from './components/UserProfile';
import ExchangeHistory from './components/ExchangeHistory';
import ConverterDescription from './components/ConverterDescription';
import Favorites from './components/FavoriteCurrencies';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={CurrencyConverter} />
          <Route path="/currencies" component={CurrencyList} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/exchange-history" component={ExchangeHistory} />
          <Route path="/converter" component={ConverterDescription} />
          {/* Add these routes for your new components */}
          <Route path="/favorites" component={Favorites} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
