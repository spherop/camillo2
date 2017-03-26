import React from 'react'
import { Link, browserHistory } from 'react-router'
import { Layout, Col, Row, Tag, Icon, Button, message, Input } from 'antd';
const { Header, Content } = Layout;
import moment from 'moment';

import {
  Editor,
  createEditorState,
} from 'medium-draft';

import { observer, inject } from 'mobx-react'

@inject(["PostStore"]) @observer
class Post extends React.Component {
  constructor(props) {
    super(props)
  }
  onEditorStateChange = (editorState) => {
    this.props.PostStore.contentDirty = true
    this.props.PostStore.post.editorState = editorState
  }
  
  getPost = (postId) => {
    this.props.PostStore.getPost(postId)
  }  
  
  componentWillMount() {
    if (this.props.params.id === "new") {
      // to do redirect to a new form instead of creating empty post
      this.props.PostStore.createPost()
    } else {
      this.props.PostStore.getPost(this.props.params.id)
    }
    this.props.PostStore.post.editMode = (this.props.params.mode === "edit") ? true : false
  }
  
  savePost = () => {
    // todo turn into promise result from above async call
    if (this.props.PostStore.savePost()) {
      message.success("Post saved")
      this.props.PostStore.post.editMode = false
    } else {
      message.error("Cannot save")
    }
  }
  
  editPost = () => { 
    this.props.PostStore.post.editMode = true
  }
  
  cancelEdit = () => { 
    this.props.PostStore.post.editMode = false
  }
  
  handleTitleChange = (e) => {
    this.props.PostStore.contentDirty = true
    this.props.PostStore.post.title = e.target.value
  }
  
  render () {
    const post = this.props.PostStore.post
    let editorState = post.loading ? null : post.editorState
    if (!editorState) {
      editorState = createEditorState()
    }
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
                  <Button type="dashed" onClick={this.savePost}>
                    Save
                  </Button>
                  <Button type="dashed" onClick={this.cancelEdit}>
                    Cancel
                  </Button>
                </div>
              }
            </Col>
          </Row>
        </Header>
        <Content className="ca-post">
          <Row>
            <Col className="text-center pd-b-4" span={10} offset={7}>
              <Link className="pd-r-2" to="/">Posts</Link>
              {!post.editMode &&
                <Button type="dashed" onClick={this.editPost}>
                  Edit
                </Button>
              }
            </Col>
          </Row>
          <Row>
            <Col span={14} offset={5}>
              {!post.editMode &&
                <div className="ca-post-header">
                  {post.loading && 
                    <em>Loading...</em>
                  }
                  {!post.loading &&
                    <span>
                      <h1>{post.title}</h1>
                      <span className="ca-post-date">{this.props.PostStore.niceDate}</span>
                    </span>
                  }
                </div>
              }
              {post.editMode &&      
                <Input className="ca-post-title-edit" placeholder={`enter post title`} defaultValue={post.title} onChange={this.handleTitleChange} autoComplete="off" /> 
              }
            </Col>
          </Row>
          <Row>
            <Col span={10} offset={5}>
              {post.editMode &&
                <Editor
                  ref="editor"
                  editorState={editorState}
                  onChange={this.onEditorStateChange} />
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