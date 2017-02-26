import React from 'react';
import { Button, Icon, Row, Col } from 'antd';
import moment from 'moment';

class FeedItems extends React.Component {
  render () {
    const items = this.props.items;
    return (    
      <div>
        {items.map((item, i) =>
          <Row className="ca-item" key={i}>
            <Col span={12}>
              <a className="ca-item-title" href={`/posts/${item.id}`}><b>{item.title}</b></a>
            </Col>
            <Col span={4}>
              {moment(item.created_at).fromNow()}
            </Col>
            <Col span={8}>
              <Icon onClick={this.props.deleteItem.bind(this, item)} className="ca-item-delete" type="close-circle" />
            </Col>
          </Row>
        )}
      </div>
    )
  }
}

FeedItems.propTypes = {
  items: React.PropTypes.array.isRequired,
  deleteItem: React.PropTypes.func.isRequired,
};

export default FeedItems;