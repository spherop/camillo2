import React from 'react'
import { Link, browserHistory } from 'react-router'
import { Layout, Col, Row, Tag, Icon, Button, message, Input } from 'antd';
const { Header, Content } = Layout;

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
class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contentState: {},
      editorContent: undefined,
      editorState: EditorState.createEmpty()
    }
    // this.props.AppStore.editor = {
    //   contentState: {},
    //   editorContent: undefined,
    //   editorState: EditorState.createEmpty()
    // }
    // this.savePost = this.savePost.bind(this);
  }

  onEditorChange = (editorContent) => {
    this.props.AppStore.post.editorContent = editorContent
    // this.setState({
    //   editorContent
    // });
    this.props.AppStore.contentDirty = true
  }
  
  onEditorStateChange = (editorState) => {
    // this.setState({
    //   editorState
    // });
    this.props.AppStore.post.editorState = editorState
  }
  
  onContentStateChange = (contentState) => {
    console.log('contentState', contentState);
    this.props.AppStore.post.contentState = contentState
  }
  
  getPost = (postId) => {
    this.props.AppStore.getPost(postId)
  }  
  
  componentWillMount() {
    if (this.props.params.id === "new") {
      this.props.AppStore.createPost()
    } else {
      this.props.AppStore.getPost(this.props.params.id)
    }
    
    this.props.AppStore.post.editMode = (this.props.params.mode === "edit") ? true : false
    
  }
  
  componentWillUnmount() {
    // this.props.AppStore.savePost()
  }
  
  savePost = () => {
    // todo turn into promise result from above async call
    if (this.props.AppStore.savePost()) {
      message.success("Post saved")
      this.props.AppStore.post.editMode = false
    } else {
      message.error("Cannot save")
    }
    
    
  }
  editPost = () => { 
    this.props.AppStore.post.editMode = true
  }
  cancelEdit = () => { 
    this.props.AppStore.post.editMode = false
  }
  
  handleTitleChange = (e) => {
    this.props.AppStore.contentDirty = true
    this.props.AppStore.post.title = e.target.value
  }
  
  render () {
    const toolbar = { options: ['inline', 'fontSize', 'textAlign', 'list'], 
      inline: {inDropdown: true}, list: {inDropdown: true}, textAlign: { inDropdown: true }
    }
    const post = this.props.AppStore.post
    const editorState = post.loading ? null : post.editorState
    const postBody = post.loading ? null : post.body
    return (
      <Layout className="ca-layout">
        <Header>
          <Row>
            
            <Col span={2} offset={20}>
              
              
            </Col>
            <Col span={2}>
              {post.editMode &&
                <div>
                  <Button>
                    <Link onClick={this.savePost}>Save</Link>
                  </Button>
                  <Button>
                    <Link onClick={this.cancelEdit}>Cancel</Link>
                  </Button>
                </div>
              }


            </Col>
          </Row>
          
        </Header>
        <Content className="ca-post">
          {!post.editMode &&
            <Row>
              <Col className="text-center" span={16} offset={4}>
                <Col span={23}>
                  <Link to="/posts"><Icon type="bars" /></Link>
                </Col>
                <Col span={1}>
                  {!post.editMode &&
                    <Button>
                      <Link onClick={this.editPost}>Edit</Link>
                    </Button>
                  }
                </Col>
                <hr/>
              </Col>

            </Row>
          }
          <Row>
            <Col span={11} offset={6}>
              
              {!post.editMode &&
                <h1 className="ca-post-header">{post.loading ? "loading ..." : post.title}</h1>
              }
              {post.editMode &&      
                <Input className="ca-post-title-edit" placeholder={`enter post title`} defaultValue={post.title} onChange={this.handleTitleChange} autoComplete="off" /> 
              }
            </Col>
          </Row>
          <Row>
            <Col span={12} offset={6}>
              {post.editMode &&
                <Editor
                  toolbar={toolbar}
                  toolbarOnFocus={false}
                  editorState={editorState}
                  toolbarClassName="ca-post-toolbar"
                  wrapperClassName="ca-post-wrapper"
                  editorClassName="ca-editor"
                  onEditorStateChange={this.onEditorStateChange}
                  onContentStateChange={this.onEditorChange}
                />
              }
              {!post.editMode && 
                <div className="ca-post-body" dangerouslySetInnerHTML={{__html: postBody}}></div>
              }
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}

export default Post