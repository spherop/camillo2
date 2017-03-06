import React from 'react'
import { Link, browserHistory } from 'react-router'
import { Layout, Col, Row, Tag, Icon, Button, message } from 'antd';
const { Header, Content } = Layout;

import moment from 'moment';

import {
  Editor,
  createEditorState,
} from 'medium-draft';

import { observer, inject } from 'mobx-react'

@inject(["FeedStore"]) @observer
class Item extends React.Component {
  constructor(props) {
    super(props)
    this.saveItem = this.saveItem.bind(this);
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
  
  
  render () {
    // const { editorContent, contentState, editorState } = this.state;
    const item = this.props.FeedStore.item
    let editorState = item.loading ? null : item.editorState
    if (!editorState) {
      editorState = createEditorState()
    }
    return (
      <Layout className="ca-layout">
        <Header>
          <Row>
            <Col span={1} offset={6}>
              <Link to="/items"><Icon type="bars" /></Link>
            </Col>
            <Col span={1}>
              <Link to={"/" + item.item_type + "s"}>{item.item_type + "s"}</Link>
            </Col>
            <Col span={12}>
              <Button>
                <Link onClick={this.saveItem}>Save</Link>
              </Button>
            </Col>
          </Row>
          
        </Header>
        <Content>
          <Row>
            <Col span={11} offset={6}>
              <h1>{item.title}</h1>
            </Col>
          </Row>
          <Row>
            <Col span={12} offset={6}>
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

export default Item