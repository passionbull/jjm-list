import React, { Component } from 'react';
import {
  Platform,
} from 'react-native';
import PayOut from './Component/Payout';
import Voting from './Component/Voting';
import Home from './Component/Home';
import { Route, Router, Switch } from './Utils/Routing';

class App extends Component {
  render() {
    return (

      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/voting" component={Voting} />
          <Route exact path="/payout" component={PayOut} />
        </Switch>
      </Router>
    );
  }
}


let hotWrapper = () => () => App;
if (Platform.OS === 'web') {
  const { hot } = require('react-hot-loader');
  hotWrapper = hot;
}
export default hotWrapper(module)(App);
