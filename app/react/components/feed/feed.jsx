import 'antd/dist/antd.css';
import React from 'react';
import { Layout, Icon, Row, Col } from 'antd';
const { Header, Content } = Layout;
import { Link, browserHistory } from 'react-router'
import { observer, inject } from 'mobx-react'
import FeedNav from './feed-nav'
import FeedItems from './feed-items';
import Create from './create';


@inject(["FeedStore"]) @observer
class Feed extends React.Component {
  constructor(props) {
    super(props)
  }
  
  componentWillMount() {
    console.log("feed mount", this.props)
    const itemPath = this.props.params.type ? this.props.params.type : "items"
    this.props.FeedStore.getItems(itemPath)
  }
  
  createItem = (values) => {
    this.props.FeedStore.createItem(values);
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      this.props.FeedStore.getItems(nextProps.params.type)
    }
  }
  
  render () {
    const items = this.props.FeedStore.items
    
    return (
      <Layout className="ca-feed">
        {/* <DevTools /> */}
        <FeedNav />
        <Content className="ca-layout-content">
          <Row>
            <Col span={24}>
              <Create handleCreateItem={this.createItem} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="ca-feed">
                <FeedItems items={items}  />
              </div>
            </Col>
          </Row>
          
        </Content>
      </Layout>
    )
  } 
}

export default Feed;