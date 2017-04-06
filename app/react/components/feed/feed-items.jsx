import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { observer, inject } from 'mobx-react';
import FeedItem from './feed-item';
import Loading from '../common/loading';
import Create from './create';
import { Dropdown, Menu, Icon, message, Row, Col } from 'antd';
import { Link, browserHistory } from 'react-router';
require('./feed-items.css.scss');



@inject(["FeedStore"]) @observer
class FeedItems extends React.Component {
  
  constructor(props) {
    super(props)
    this.menu = (
      <Menu onClick={this.onClick}>
        <Menu.Item key="/items">All</Menu.Item>
        <Menu.Item key="/goals">Goals</Menu.Item>
        <Menu.Item key="/ideas">Ideas</Menu.Item>
        <Menu.Item key="/creative_actions">Actions</Menu.Item>
      </Menu>
    );
  }
  
  onClick ({ key }) {
    browserHistory.push(key);
    // message.info(`Click on item ${key}`);
  };

  
  createItem = (values) => {
    console.log(values)
    this.props.FeedStore.createItem(values);
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
      <div className="ca-feed-items pd-b-4">
        <Row className="ca-header bd-bd-1">
          <Col span={24}>
            
            <Dropdown overlay={this.menu} trigger={['click']}>
              <a className="ant-dropdown-link" href="#">
                {this.props.FeedStore.itemType.replace("_", " ")}
                <Icon className="pd-l-1" type="down" />
              </a>
            </Dropdown>
          </Col>
        </Row>
        <Create handleCreateItem={this.createItem} />
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