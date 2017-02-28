import React from 'react';
import ReactDOM from 'react-dom';
import Feed from './feed';
import Item from './item';
import AppStore from './app-store'
import { Provider } from 'mobx-react'
import { Router, Route, Link, browserHistory } from 'react-router'

class App extends React.Component {
  
  render () {
    return (
      <Provider AppStore={this.props.store}>
        <Router history={browserHistory}>
          <Route path="/" component={Feed}>
          </Route>
          <Route path="/:type" component={Feed}/>
          <Route path="/items/:id" component={Item}/>
        </Router>
      </Provider>
    )
  } 
}

$(document).ready(function() {
  ReactDOM.render(
    <App store={ AppStore } />,
    document.getElementById('app')
  );
});