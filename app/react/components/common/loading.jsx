import React from 'react';
import { Spin, Button } from 'antd';
require("./loading.css.scss")

class Loading extends React.Component {
  render() {
    return (
      <div className="ca-loading">
        <Button className="loading-btn" shape="circle" loading={true} size="large" />
      </div>
    )
  }
}

export default Loading;