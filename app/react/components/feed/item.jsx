require("./item.css.scss");
import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Layout, Col, Row, Tag, Icon, Button, message, Input } from 'antd';
const { Header, Content } = Layout;
import Loading from "../common/loading";
import moment from 'moment';
import _ from 'lodash';
_.mixin(require("lodash-inflection"));


import {
  Editor,
  createEditorState,
} from 'medium-draft';

import { observer, inject } from 'mobx-react';

@inject(["FeedStore"]) @observer
class Item extends React.Component {
  constructor(props) {
    super(props)
    this.saveItem = this.saveItem.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
  }
    
  onEditorStateChange = (editorState) => {
    this.props.FeedStore.contentDirty = true
    this.props.FeedStore.item.editorState = editorState
  }
  
  // todo move to mobx store
  getItem = (itemId) => {
    this.props.FeedStore.getItem(itemId)
  }
  
  saveItem = () => {
    this.props.FeedStore.saveItem()
  }
  
  componentWillMount() {
    this.getItem(this.props.params.id)
  }
  
  componentWillUnmount() {
    this.saveItem()
  }
  
  onTitleChange(e) {
    this.props.FeedStore.item.title = e.target.value;
  }
  
  render () {
    const item = this.props.FeedStore.item;
    let editorState = item.loading ? null : item.editorState;
    const leftOffset = 7;
    if (!editorState) {
      editorState = createEditorState();
    }
    if (item.loading) {
      return (
        <Loading />
      )
    }
    return (
      <Layout className="ca-layout ca-item">
        <Header>
          <Row>
            <Col className="fs tt-uc" span={10} offset={leftOffset}>
              {/*<Link to="/items"><img className="nav-icon" src="/assets/levels.svg" /></Link>*/}
              <Link to={"/" + _.pluralize(item.item_type)}><Icon type="double-left"></Icon> {_.pluralize(item.item_type.replace("_", " "))}</Link>
              
            </Col>
            <Col span={1} className="tr">
              <Button type="dashed" onClick={this.saveItem}>Save</Button>
            </Col>
          </Row>  
        </Header>
        <Content>
          <Row>
            <Col span={11} offset={leftOffset}>
              <Input onChange={this.onTitleChange} value={item.title} placeholder="..." />
            </Col>
          </Row>
          <Row>
            <Col span={11} offset={leftOffset}>
              <Editor
                ref="editor"
                editorState={editorState}
                onChange={this.onEditorStateChange} />
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}

export default Item;