import React from 'react';

class NavButton extends React.Component {

  render() {
    return(
      <a style={this.props.style} 
        className="" 
        href={this.props.buttonUrl}>
        {this.props.buttonText}
      </a>
    );
  }
}

NavButton.propTypes = {
  buttonText: React.PropTypes.string.isRequired,
  buttonUrl: React.PropTypes.string.isRequired,
};

export default NavButton;