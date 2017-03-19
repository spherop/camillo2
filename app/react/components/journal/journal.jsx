import React from 'react'
import { Link, browserHistory } from 'react-router'

import { Layout, Icon, Row, Col } from 'antd';
const { Header, Content } = Layout;
import FeedNav from '../feed/feed-nav'
class Journal extends React.Component {
  render() {
    return (
      <Layout className="ca-feed ca-journal">
        <Content className="ca-layout-content">
            <h1>Write here</h1>
        </Content>
        
      </Layout>
    )
  }
}
export default Journal