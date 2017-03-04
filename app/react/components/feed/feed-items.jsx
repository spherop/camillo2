import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' 
import { observer, inject } from 'mobx-react'
import FeedItem from './feed-item'

@inject(["AppStore"]) @observer
class FeedItems extends React.Component {
  
  constructor(props) {
    super(props)
  }
  
  render () {
    const items = this.props.AppStore.items;
    return (    
      <div>
        <ReactCSSTransitionGroup
          transitionName="ca-list"
          transitionEnterTimeout={50}
          transitionLeaveTimeout={150}
          transitionAppear={true}
          transitionAppearTimeout={50}>
          {items.map((item, i) =>
            <FeedItem key={i} item={item} />
          )}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

FeedItems.propTypes = {
  items: React.PropTypes.object.isRequired,
};

export default FeedItems;