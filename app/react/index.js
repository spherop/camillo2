import RWR from 'react-webpack-rails';
RWR.run();

import NavButtons from './components/nav/nav-buttons';
import Feed from './components/feed';
// RWR.registerComponent('NavButtons', NavButtons);
RWR.registerComponent('Feed', Feed);
