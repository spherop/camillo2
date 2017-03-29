import React from 'react'
import { Link, browserHistory } from 'react-router'
// import BigCalendar from 'react-big-calendar';
// require("react-big-calendar/lib/css/react-big-calendar.css")

import moment from 'moment';

import { Layout, Icon, Row, Col } from 'antd';
const { Header, Content } = Layout;
import FeedNav from '../feed/feed-nav'


BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
class Journal extends React.Component {
  render() {
    return (
      <Layout className="ca-feed ca-journal">
        <Content className="ca-layout-content">
          <BigCalendar
            events={[]}
            startAccessor='startDate'
            endAccessor='endDate'
          />
        </Content>
        
      </Layout>
    )
  }
}
export default Journal



