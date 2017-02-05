import React from 'react';

class NavButton extends React.Component {

  render() {
    return(
      <a style={this.props.style} 
        className="pa-10 dib bg-dark-blue moon-gray w-25 h3 f4 items-center flex flex-row justify-center ma2 grow" 
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