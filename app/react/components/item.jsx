import React from 'react'
import { Link, browserHistory } from 'react-router'
import { Layout, Col, Row, Tag, Icon } from 'antd';
const { Header, Content } = Layout;

class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: {id: null, title: "loading..."}
    }
  }
  
  getItem = (itemId) => {
    $.getJSON('/items/' + itemId)
    .done((data) => {
      console.log("item", data)
      this.setState({
        item: data
      });
    })
    .fail(() => {
      // TODO handle errors more gracefully
      alert("WEAK ASS SHIT");
    })
    .always(() => { });
  }
  
  componentWillMount() {
    this.getItem(this.props.params.id)
  }
  
  
  render () {
    const item = this.state.item
    return (
      <Layout className="ca-layout-content">
        <Header>
          <Link to="/"><Icon type="bars" /></Link>
        </Header>
        <Content>
          <Row>
            <Col span={24}>
              <h1>{item.title} <Tag>{item.item_type}</Tag></h1>
              
              <div dangerouslySetInnerHTML={{ __html:item.notes }}>
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}

export default Item