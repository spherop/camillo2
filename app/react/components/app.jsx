import React from 'react';
import Feed from './feed';
import Item from './item';
import { Router, Route, Link, browserHistory } from 'react-router'

class App extends React.Component {
  
  render () {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Feed}>
        </Route>
        <Route path="/:type" component={Feed}/>
        <Route path="/items/:id" component={Item}/>
      </Router>
    )
  } 
}

export default App;