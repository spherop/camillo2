import React from 'react';
import { Button, Icon, Row, Col, Tag, Modal } from 'antd';
const confirm = Modal.confirm;
import { observer, inject } from 'mobx-react';
import { Link, browserHistory } from 'react-router';
import EditableItem from './editable-item';
import moment from 'moment';
require('./feed-item.css.scss');


@inject(["FeedStore"]) @observer
class FeedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false
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
  
  onTitleChange = (e) => {
    this.itemTitle = e.target.value;  
    this.props.item.title = e.target.value;
  }
  
  editMode = () => {
    this.setState({
      editMode: !this.state.editMode
    })
  }
  
  render () {
    const item = this.props.item;
    return (
      <div className="ca-feed-item">
      <Row  key={item.id}>
        <Col span={19} className="tl">
          {!this.state.editMode &&  
            <Link className="ca-item-title" to={`/items/${item.id}`}>{item.title}</Link>
          }
          {this.state.editMode &&
            <Input onChange={this.onTitleChange} value={this.itemTitle} placeholder="..." />
          }  
        </Col>
        <Col span={2}>
          {this.props.FeedStore.itemType === "items" &&
            <Tag>
              <Link className="ca-item-type" to={`/${item.item_type}s`}>{item.item_type && item.item_type.replace(/_/g, " ")}</Link>
            </Tag>
          }
        </Col>

        <Col span={1}>
          <span className="ca-plus" onClick={this.editMode}><Icon type="down"></Icon></span>
        </Col>
        
        <Col span={2} className="ca-item-delete tr">
          <Icon onClick={this.deleteItem.bind(this, item)} className="ca-item-delete" type="close" />
        </Col>
      </Row>
      <Row>
        <Col>
          <span className="ca-item-time">
            {moment(item.updated_at).fromNow()}
          </span>
        </Col>
      </Row>
      {this.state.editMode &&
        <EditableItem index={this.props.index} item={item} />
      }
      </div>
    )
  }
}

FeedItem.propTypes = {
  item: React.PropTypes.object.isRequired,
};

export default FeedItem;