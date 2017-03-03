import React from 'react';
import { Link } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' 
import { Button, Icon, Row, Col, Tag } from 'antd';
import { observer, inject } from 'mobx-react'
import moment from 'moment';


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
            <Row className="ca-item" key={i}>
              <Col span={12}>
                <Link className="ca-item-title" to={`/items/${item.id}`}>{item.title}</Link>
              </Col>
              <Col span={4}>
                <Tag>
                  <Link className="ca-item-type" to={`/${item.item_type}s`}>{item.item_type && item.item_type.replace(/_/g, " ")}</Link>
                </Tag>
              </Col>
              <Col span={4}>
                <span className="ca-item-time">
                  {moment(item.created_at).fromNow()}
                </span>
              </Col>
              <Col span={4}>
                <Icon onClick={this.props.deleteItem.bind(this, item)} className="ca-item-delete" type="close-circle" />
              </Col>
            </Row>
          )}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

FeedItems.propTypes = {
  items: React.PropTypes.object.isRequired,
  deleteItem: React.PropTypes.func.isRequired,
};

export default FeedItems;