import React from 'react';

class LogoImage extends React.Component {
  render () {
    return (
      <img src="<%= asset_url('levels.svg') %>" />
    );
  }
}

export default LogoImage;