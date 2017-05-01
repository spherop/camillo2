import React from 'react';
import { Layout, Icon, Row, Col } from 'antd';
const { Header, Content } = Layout;
import { Link, browserHistory } from 'react-router';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
require("./feed-nav.css.scss");

@inject("FeedStore", "UiStore") @observer
class FeedNav extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      showNav: true
    }
  }
  
  toggleNav = () => {
    this.props.UiStore.toggleFeedNav();
  }
  
  renderNavItems() {
    return (
      <Header>
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
  
  render () {
    const visible = this.props.UiStore.feedNavVisible;
    const toggleType = visible ? "down" : "right";
    // extra spans are here as a hack to prevent selection of elements on clicks of toggle
    return (
      <div className={this.props.className}>
        {/*<span>
          <Icon className="ca-feed-toggle" onClick={this.toggleNav} type={toggleType}></Icon>
        </span>*/}
        <span>
          {visible && this.renderNavItems()}
        </span>
      </div>

    )
  }
  
}

export default FeedNav;

