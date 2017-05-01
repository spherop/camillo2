import React from 'react'
import { Link, browserHistory } from 'react-router'
import { Col, Row } from 'antd';
import AuthView from './auth/auth-view';
require("./app-nav.css.scss")

class AppNav extends React.Component {  
  render() {
    console.log("params", browserHistory.getCurrentLocation())
    const isPost = this.props.location.pathname.startsWith("/posts") ? true : false
    return (
      <div>
        <header className="ca-app-nav">
          <Row>
            <Col span={12}>            
              <Link className="ca-logo ca-nav-link" style={{fontSize: 18, letterSpacing: 1}} activeClassName="active" to="/posts">
                <img className="ca-nav-icon" src="/assets/levels.svg" /> Creative Flow
              </Link>
            </Col>
            <Col span={12}>
              <AuthView>
                <Link className="ca-nav-link" activeClassName="active" to="/items"><img className="ca-nav-icon" src="/assets/pencil.svg" /> Notebook</Link>
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