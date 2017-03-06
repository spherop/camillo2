import 'antd/dist/antd.css';
import React from 'react';
import PostNav from './post-nav'

import { Layout, Icon, Row, Col } from 'antd';
const { Header, Content } = Layout;
import { Link, browserHistory } from 'react-router'
import { observer, inject } from 'mobx-react'


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
  
  render () {
    const posts = this.props.PostStore.posts
    
    return (
      <Layout className="ca-feed">
        {/* <DevTools /> */}
        <Content className="ca-layout-content">
          <Row>
            <Col span={24}>
              <PostNav />
              <hr />
              <div className="ca-posts">
                {posts.map((post, i) =>
                  <Row key={i}>
                    <h1><Link to={"/posts/" + post.id}>{post.title}</Link></h1>
                    <p dangerouslySetInnerHTML={{__html: post.summary}}>
                    </p>
                  </Row>
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