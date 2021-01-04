import React from 'react';
import './style.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import LogIn from './components/LogIn/LogIn';
import Registration from './components/reg/reg';
import account from './components/account/account';
import contacts from './components/contacts/contacts';
import favorites from './components/favorites/favorites';


class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route path="/login" component={LogIn} />
          <Route path="/registration" component={Registration}/>
          <Route path='/account' component={account}/>
          <Route path='/contacts' component={contacts}/>
          <Route path='/favorites' component={favorites}/>
        </Switch>
      </Router>
    )
  }
}

export default (App);
