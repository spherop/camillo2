import React from 'react'
import { Link, browserHistory } from 'react-router'
import { Icon } from 'antd'
class PostNav extends React.Component {
  render() {
    return (
      <div className="ca-post-nav">
        <Link to={"/resistance"}>Resistance</Link>
        &bull;
        <Link to={"/constraints"}>Constraints</Link>
        &bull;
        <Link to={"/flow"}>Flow</Link>
        &bull;
        <Link to={"/iteration"}>Iteration</Link>
        &bull;
        <Link to={"/scene"}>Scene</Link>
        &bull;
        <Link to={"/loop"}>Loop</Link>
        &bull;
        <Link to={"/multiplicity"}>Multiplicity</Link>
      </div>
    )
  }
}
export default PostNav