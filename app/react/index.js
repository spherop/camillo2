import RWR from 'react-webpack-rails';
RWR.run();

// import NavButtons from './components/nav/nav-buttons';
import App from './components/app';
// RWR.registerComponent('NavButtons', NavButtons);
RWR.registerComponent('App', App);
