import React from 'react';
import { Layout, Icon, Row, Col } from 'antd';
const { Header, Content } = Layout;
import { Link, browserHistory } from 'react-router'
import { observer, inject } from 'mobx-react'
import classNames from 'classnames'

@inject(["AppStore"]) @observer
class FeedNav extends React.Component { 
  constructor(props) {
    super(props)
  }
  
  render () {
    const headerClass = classNames({ 'dimmed': this.props.AppStore.createHasFocus })
    return (
      <Header className={headerClass}>
        <Row justify="center">
          <Col span={1}>
            <Link activeClassName="selected" to="/"><Icon type="bars" /></Link>
          </Col>
          <Col span={4}>
            <Link activeClassName="selected" to="/ideas">Ideas</Link>
          </Col>
          <Col span={4}>
            <Link activeClassName="selected" to="/goals">Goals</Link>
          </Col>
          <Col span={4}>
            <Link activeClassName="selected" to="/creative_actions">Creative Actions</Link>
          </Col>
          <Col span={4}>
            <Link activeClassName="selected" to="/excerpts">Excerpts</Link>
          </Col>  
          <Col span={4}>
            <Link activeClassName="selected" to="/next_steps">Next Steps</Link>
          </Col>
          <Col span={3}>
            <Link activeClassName="selected" to="/learnings">Learnings</Link>
          </Col>  
        </Row>
      </Header>
    )
  }
  
}

export default FeedNav;

