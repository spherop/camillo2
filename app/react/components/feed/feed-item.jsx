import React from 'react';
import { Button, Icon, Row, Col, Tag, Modal } from 'antd';
const confirm = Modal.confirm;
import { observer, inject } from 'mobx-react';
import { Link, browserHistory } from 'react-router';
import moment from 'moment';
require('./feed-item.css.scss');


@inject(["FeedStore"]) @observer
class FeedItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showNotes: false
    }
  }
  deleteItem(deleteItem) {
    var FeedStore =  this.props.FeedStore;
    var deleteItem = deleteItem;
    confirm({
      title: 'Want to delete this item?',
      okText: "Yes",
      cancelText: "Cancel",
      onOk() { 
        FeedStore.deleteItem(deleteItem);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
    
  }
  componentWillMount = () => {
    if (this.props.params && (this.props.params.id === this.props.item.id)) {
      this.setState({
        showNotes: true
      })
      this.props.FeedStore.getItem(this.props.item.id)
    }
  }
  
  render () {
    const item = this.props.item;
    return (
      <Row className="ca-feed-item" key={item.id}>
        <Col span={16} className="tl">
          <Link className="ca-item-title" to={`/items/${item.id}`}>{item.title}</Link>
        </Col>
        <Col span={4}>
          <span className="ca-item-time">
            {moment(item.updated_at).fromNow()}
          </span>
        </Col>
        <Col span={2}>
          {this.props.FeedStore.itemType === "items" &&
            <Tag>
              <Link className="ca-item-type" to={`/${item.item_type}s`}>{item.item_type && item.item_type.replace(/_/g, " ")}</Link>
            </Tag>
          }
        </Col>

        <Col span={2} className="ca-item-delete tr">
          <Icon onClick={this.deleteItem.bind(this, item)} className="ca-item-delete" type="close" />
        </Col>
        {this.props.FeedStore.item && this.state.showNotes &&
          <Row>
          <b>WE HAVE NOTES</b>
          </Row>
        }
      </Row>

    )
    
  }
}

FeedItem.propTypes = {
  item: React.PropTypes.object.isRequired,
};

export default FeedItem;