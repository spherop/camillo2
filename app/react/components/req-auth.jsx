import React from 'react'

class ReqAuth extends React.Component {
  render () {
    return (
      <span>
        {window.auth && this.props.children}
      </span>
    )
  }
}

export default ReqAuth