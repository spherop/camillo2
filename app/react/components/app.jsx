import React from 'react';
import ReactDOM from 'react-dom';
import Feed from './feed';
import Posts from './posts';
import Post from './post';
import Item from './item';
import HeaderNav from './header-nav';
import AppStore from './app-store'
import { Provider } from 'mobx-react'
import { message } from 'antd'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

class App extends React.Component {
  
  
  requireAuth = () => {
    if (!window.auth) {
      message.warning("Please signup")
      browserHistory.replace("/posts")
    }
  }
  
  render () {
    return (
      <Provider AppStore={this.props.store}>
        <Router history={browserHistory}>
          <Route path="/" component={HeaderNav}>
            <IndexRoute component={Posts} />
            <Route path="/posts" component={Posts}/>
            <Route path="/posts/:id" component={Post}/>
            <Route path="/posts/:id/:mode" component={Post}/>
            <Route path="/items" component={Feed} onEnter={this.requireAuth} />
            <Route path="/items/:id" component={Item} onEnter={this.requireAuth} />
            <Route path="/:type" component={Feed} onEnter={this.requireAuth} />
          </Route>
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