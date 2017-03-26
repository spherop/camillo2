import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { observer, inject } from 'mobx-react';
import FeedItem from './feed-item';
import Loading from '../common/loading';
require('./feed-items.css.scss')

@inject(["FeedStore"]) @observer
class FeedItems extends React.Component {
  
  constructor(props) {
    super(props)
  }
  
  _renderItems = () => {
    
    
    console.log("store.items", store.items)
    if (store.itemType !== "sources") {
      return (
        <div>
          {store.feedItems.map((item, i) =>
            <FeedItem key={i} item={item} />
          )}
        </div>
      )
    } else {
      return (
        <div>
          {store.sourceItems.map((item, i) =>
            <SourceItem key={i} item={item} />
          )}
        </div>
      )
    }
  }
  
  render () {
    const items = this.props.FeedStore.items;
    if (this.props.FeedStore.loading) {
      return (
        <Loading />
      )
    }
    return (    
      <div className="ca-feed-items bd-bd-1 pd-b-4">
        <div className="ca-header bd-bd-1">{this.props.FeedStore.itemType.replace("_", " ")}</div>
        <ReactCSSTransitionGroup
          transitionName="ca-list"
          transitionEnterTimeout={50}
          transitionLeaveTimeout={150}
          transitionAppear={true}
          transitionAppearTimeout={50}>
          <div>
            {items.map((item, i) =>
              <FeedItem key={i} item={item} />
            )}
          </div>
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

FeedItems.propTypes = {
  items: React.PropTypes.object.isRequired,
};

export default FeedItems;