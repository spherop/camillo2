import 'antd/dist/antd.css';
import React from 'react';
import Create from './create';
import PostNav from './posts/post-nav'

import { Layout, Icon, Row, Col } from 'antd';
const { Header, Content } = Layout;
import { Link, browserHistory } from 'react-router'
import { observer, inject } from 'mobx-react'


@inject(["AppStore"]) @observer
class Posts extends React.Component {
  constructor(props) {
    super(props)
  }
  
  componentWillMount() {
    console.log("posts mount", this.props)
    this.props.AppStore.getPosts()
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      this.props.AppStore.getPosts()
    }
  }
  
  render () {
    const posts = this.props.AppStore.posts
    
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
                    <p dangerouslySetInnerHTML={{__html: post.body}}>
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