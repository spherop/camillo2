import 'antd/dist/antd.css';
import React from 'react';
import PostNav from './post-nav'
import AuthView from '../auth/auth-view';
import { Layout, Icon, Row, Col, Modal } from 'antd';
const confirm = Modal.confirm;
const { Header, Content } = Layout;
import { Link, browserHistory } from 'react-router'
import { observer, inject } from 'mobx-react';
require("./posts.css.scss")


@inject(["PostStore"]) @observer
class Posts extends React.Component {
  constructor(props) {
    super(props)
  }
  
  componentWillMount() {
    console.log("posts mount", this.props)
    this.props.PostStore.getPosts()
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      this.props.PostStore.getPosts()
    }
  }
  
  deletePost (post) {
    var postStore =  this.props.PostStore;
    var post = post;
    confirm({
      title: 'Want to delete this post?',
      okText: "Yes",
      cancelText: "Cancel",
      onOk() { 
        postStore.deletePost(post.id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
    
  }
  
  render () {
    const posts = this.props.PostStore.posts
    console.log(posts.splice())
    return (
      <Layout className="ca-feed">
        
        <Content className="ca-layout-content">
          <Row>
            <Col span={24}>
              <PostNav />
              <hr />
              <div className="ca-posts">
                {posts.map((post, i) =>
                  <div>
                    <Row key={i}>
                      <Col span={22}>
                        <h1>
                          <Link to={"/posts/" + post.id}>{post.title}</Link>
                        </h1>
                      </Col>
                      <Col span={2}>
                        <AuthView shownToId={post.user_id}>
                          <Icon onClick={this.deletePost.bind(this, post)} type="close" />
                        </AuthView>
                      </Col>
                    </Row>
                    <Row>
                      <p dangerouslySetInnerHTML={{__html: post.summary}}>
                      </p>
                    </Row>
                  </div>
                )}
              </div>
            </Col>
          </Row>
          <Link to={"/posts/new"}>New Post</Link>
        </Content>
      </Layout>
    )
  } 
}

export default Posts;