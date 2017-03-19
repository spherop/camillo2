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
            <Col span={12}>            
              <Link className="ca-logo" style={{fontSize: 20, letterSpacing: 1}} activeStyle={{ color: '#333' }} to="/posts"><img className="nav-icon" src="/assets/steps.svg" /> Creative Steps</Link>
            </Col>
            <Col span={12}>
              <AuthView>
                <Link className="ca-u-btn" activeClassName="selected" to="/journal"><img className="nav-icon" src="/assets/pencil-and-notebook.svg" /></Link>
                <Link className="ca-u-btn" activeStyle={{ color: '#333' }} to="/items"><img className="nav-icon" src="/assets/levels.svg" /> Flow</Link>
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