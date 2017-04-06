import 'antd/dist/antd.css';
import React from 'react';
import { Layout, Icon, Row, Col } from 'antd';
const { Header, Content } = Layout;
import { Link, browserHistory } from 'react-router';
import { observer, inject } from 'mobx-react';
import FeedNav from './feed-nav';
import FeedItems from './feed-items';


@inject(["FeedStore"]) @observer
class Feed extends React.Component {
  constructor(props) {
    super(props)
  }
  
  componentWillMount() {
    console.log("feed mount", this.props);
    const itemPath = this.props.params.type ? this.props.params.type : "items";
    this.props.FeedStore.getItems(itemPath);
  }
  
  
  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      this.props.FeedStore.getItems(nextProps.params.type);
    }
  }
  
  render () {
    const items = this.props.FeedStore.items;
    return (
      <Layout className="ca-feed">
        {/*<FeedNav />*/}
        <Content className="ca-layout-content">
          <Row>
            <Col span={24}>
              <div className="ca-feed">
                <FeedItems items={items} />
              </div>
            </Col>
          </Row>
          <Row>

          </Row>
        </Content>
      </Layout>
    )
  } 
}

export default Feed;