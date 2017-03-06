import React from 'react'
import { Link, browserHistory } from 'react-router'
import { Layout, Col, Row, Tag, Icon, Button, message } from 'antd';
const { Header, Content } = Layout;

import moment from 'moment';

// EDITOR based off this example https://github.com/jpuri/react-draft-wysiwyg/blob/master/js/playground/index.js
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html'; // eslint-disable-line import/no-extraneous-dependencies
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
  convertFromHTML,
  convertToRaw,
  ContentState,
  EditorState,
} from 'draft-js';

import { observer, inject } from 'mobx-react'

@inject(["AppStore"]) @observer
class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contentDirty: false,
      contentState: {},
      editorContent: undefined,
      editorState: EditorState.createEmpty()
    }
    this.saveItem = this.saveItem.bind(this);
  }

  onEditorChange = (editorContent) => {
    this.setState({
      editorContent,
      contentDirty: true
    });
  }
  
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    });
  }
  
  onContentStateChange = (contentState) => {
    console.log('contentState', contentState);
  }
  
  
  // todo move to mobx store
  getItem = (itemId) => {
    $.getJSON('/items/' + itemId)
    .done((item) => {
      console.log("get item", item)
      let contentState = null
      if (item.notes) {
        const contentBlocks = convertFromHTML(item.notes)
        contentState = ContentState.createFromBlockArray(contentBlocks);
      }
      const editorState = contentState ? EditorState.createWithContent(contentState) : null
      this.props.AppStore.item = item
      this.setState({
        // item: item,
        editorState: editorState, 
      });
    })
    .fail(() => {
      // TODO handle errors more gracefully
      alert("couldn't get item");
    })
    .always(() => { });
  }
  
  saveItem = () => {
    if (!this.state.contentDirty) {
      return false
    }
    $.ajax({
      method: "PUT",
      dataType: "json",
      url: "/items/" + this.props.AppStore.item.id,
      data: { item: { id: this.props.AppStore.item.id, notes: draftToHtml(this.state.editorContent, {}) } }
    })
    .done((item) => {
      message.success('Item saved');
      this.props.AppStore.item = item
      this.setState({
        contentDirty: false
      })
    })
    .fail(() => {
      alert("FAILED THAT ONE YO!")
    });
  }
  
  componentWillMount() {
    this.getItem(this.props.params.id)
  }
  
  componentWillUnmount() {
    this.saveItem()
  }
  
  componentWillReceiveProps(nextProps) {
    
  }
  
  render () {
    const { editorContent, contentState, editorState } = this.state;
    const toolbar = { options: ['inline', 'fontSize', 'textAlign', 'list'], 
      inline: {inDropdown: true}, list: {inDropdown: true}, textAlign: { inDropdown: true }
    }
    const item = this.props.AppStore.item
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
                toolbar={toolbar}
                toolbarOnFocus={false}
                editorState={editorState}
                toolbarClassName="ca-item-toolbar"
                wrapperClassName="ca-item-wrapper"
                editorClassName="ca-editor"
                onEditorStateChange={this.onEditorStateChange}
                onContentStateChange={this.onEditorChange}
              />
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}

export default Item