import React from 'react';
import { Layout, Icon, Row, Col } from 'antd';
const { Header, Content } = Layout;
import { Link, browserHistory } from 'react-router'
import { observer, inject } from 'mobx-react'
import classNames from 'classnames'

@inject("FeedStore", "AppStore") @observer
class FeedNav extends React.Component { 
  constructor(props) {
    super(props)
  }
  
  render () {
    const headerClass = classNames('ca-nav', { 'dimmed': this.props.AppStore.createHasFocus })
    return (
      <Header className={headerClass}>
        <Link className="ca-n-1" activeClassName="selected" to="/creative_actions">Actions</Link>
        <Link className="ca-n-2" activeClassName="selected" to="/ideas">Ideas</Link>
        <Link className="ca-n-3" activeClassName="selected" to="/goals">Goals</Link>
        <Link className="ca-n-4" activeClassName="selected" to="/strengths">Strengths</Link>
        <Link className="ca-n-5" activeClassName="selected" to="/blockers">Blockers</Link>
        <Link className="ca-n-6" activeClassName="selected" to="/sources">Sources</Link>
        <Link className="ca-n-7" activeClassName="selected" to="/next_steps">Steps</Link>
        <Link className="ca-n-8" activeClassName="selected" to="/learnings">Learnings</Link>
        <Link className="ca-n-9" activeClassName="selected" to="/curiosities">Curiosities</Link>
        <Link className="ca-n-10" activeClassName="selected" to="/observings">Observings</Link>
        <Link className="ca-n-10" activeClassName="selected" to="/randoms">Randoms</Link>
      </Header>
    )
  }
  
}

export default FeedNav;

