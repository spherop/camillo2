import React from 'react';
import NavButton from './nav-button.jsx';

class NavButtons extends React.Component {

  render() {
    return(
      <div className="justify-start flex flex-row">
        <NavButton style={{width: "50px"}} buttonText="*" buttonUrl={"/items"}  />
        <NavButton buttonText="Ideas" buttonUrl={"/ideas"}  />
        <NavButton buttonText="Goals" buttonUrl={"/goals"}  />
        <NavButton buttonText="Next Steps" buttonUrl={"/next_steps"}  />
        <NavButton buttonText="Prompts" buttonUrl={"/questions"}  />
        <NavButton buttonText="Creative Actions" buttonUrl={"/creative_actions"}  />
      </div>
    );
  }
}

// NavButtons.propTypes = {
//   buttonText: React.PropTypes.string.isRequired,
//   buttonUrl: React.PropTypes.string.isRequired,
// };

export default NavButtons;