import React from 'react';

// wrap this component around anything you want to show/hide 
// in the UI based on auth
class AuthView extends React.Component {
  render () {
    let viewable = window.auth;
    if (!viewable) {
      return
    }
    if (this.props.shownToId && (this.props.shownToId !== window.user.id)) {
      viewable = false
    }
    return (
      <span>
        {viewable && this.props.children}
      </span>
    )
  }
}

AuthView.propTypes = {
  shownToId: React.PropTypes.number,
};
export default AuthView;