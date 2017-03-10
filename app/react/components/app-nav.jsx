import React from 'react'
import { Link, browserHistory } from 'react-router'
import { Col, Row } from 'antd';
import AuthView from './auth/auth-view'

class AppNav extends React.Component {  
  render() {
    console.log("params", browserHistory.getCurrentLocation())
    const isPost = this.props.location.pathname.startsWith("/posts") ? true : false
    return (
      <div>
        <header className="ca-top-nav">
          <Row>
            <Col span={20} offset={1}>
              <h2><Link activeStyle={{ color: '#333' }} to="/posts">POSTS</Link></h2>
            </Col>
            <Col span={2}>
              <AuthView>
                <Link className="ca-u-btn" activeStyle={{ color: '#333' }} to="/items">Flow</Link>
              </AuthView>
            </Col>
          </Row>
        
        </header>
        {this.props.children}
      </div>
    )
    
  }
}

export default AppNav 