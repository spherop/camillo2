import React from 'react';
import ReactDOM from 'react-dom';
import Feed from './feed/feed';
import Posts from './posts/posts';
import Post from './posts/post';
import Journal from './journal/journal';
import Item from './feed/item';
import AppNav from './app-nav';
import AppStore from '../stores/app-store'
import PostStore from '../stores/post-store'
import FeedStore from '../stores/feed-store'
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
      <Provider {...this.props.store}>
        <Router history={browserHistory}>
          <Route path="/" component={AppNav}>
            <IndexRoute component={Posts} />
            <Route path="/posts" component={Posts}/>
            <Route path="/posts/:id" component={Post}/>

            <Route path="/posts/:id/:mode" component={Post}/>
                        <Route path="/journal" component={Journal}/>
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
    <App store={ { AppStore, PostStore, FeedStore }  } />,
    document.getElementById('app')
  );
});