import React from 'react';
import { Link } from 'react-router'
import { Button, Icon, Row, Col, Tag } from 'antd';
import { observer, inject } from 'mobx-react'
import moment from 'moment';


@inject(["FeedStore"]) @observer
class FeedItem extends React.Component {
  constructor(props) {
    super(props)
  }
  deleteItem(deleteItem) {
    this.props.FeedStore.deleteItem(deleteItem);
  }
  
  render () {
    const item = this.props.item;
    return (
      <Row className="ca-item" key={item.id}>
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
            {moment(item.updated_at).fromNow()}
          </span>
        </Col>
        <Col span={4}>
          <Icon onClick={this.deleteItem.bind(this, item)} className="ca-item-delete" type="close-circle" />
        </Col>
      </Row>
    )
    
  }
}

FeedItem.propTypes = {
  item: React.PropTypes.object.isRequired,
};

export default FeedItem;