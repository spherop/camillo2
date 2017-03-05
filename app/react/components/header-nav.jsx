import React from 'react'
import { Link, browserHistory } from 'react-router'
import { Col, Row } from 'antd';

class HeaderNav extends React.Component {  
  render() {
    console.log("params", browserHistory.getCurrentLocation())
    const isPost = this.props.location.pathname.startsWith("/posts") ? true : false
    return (
      <div>
        <header className="ca-top-nav">
          <Row>
            <Col span={20} offset={1}>
              <h2><Link to="/posts">TIME</Link></h2>
            </Col>
            <Col span={2}>
               <Link to="/">Flow</Link>
            </Col>
          </Row>
        
        </header>
        {this.props.children}
      </div>
    )
    
  }
}

export default HeaderNav 