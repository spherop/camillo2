import React from 'react'

// wrap this component around anything you want to show/hide 
// in the UI based on auth
class AuthView extends React.Component {
  render () {
    return (
      <span>
        {window.auth && this.props.children}
      </span>
    )
  }
}

export default AuthView