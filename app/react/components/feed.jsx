import 'antd/dist/antd.css';
import React from 'react';
import Create from './create';
import FeedItems from './feed-items';
import { Layout } from 'antd';
const { Header, Content } = Layout;
import { browserHistory } from 'react-router'
import { observer, inject } from 'mobx-react'
import DevTools from 'mobx-react-devtools';
// import update from 'immutability-helper'; // https://github.com/kolodny/immutability-helper - recommended for react mutations


@inject(["AppStore"]) @observer
class Feed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [{title: "loading"}],
      itemsFilter: '/items',
    }
  }
  
  // getItems = () => {
  //   this.props.AppStore.getItems()
  //   // $.getJSON(this.state.itemsFilter)
  //   // .done((data) => {
  //   //   console.log("items", data)
  //   //   this.setState({
  //   //     items: data
  //   //   });
  //   // })
  //   // .fail(() => {
  //   //   // TODO handle errors more gracefully
  //   //   alert("WEAK ASS SHIT");
  //   // })
  //   // .always(() => { });
  // }
  
  componentWillMount() {
    console.log("feed mount", this.props)
    this.props.AppStore.getItems()
    // this.getItems()
  }
  
  createItem = (values) => {
    this.props.AppStore.createItem(values);
  }
  
  deleteItem = (deleteItem) => {
    this.props.AppStore.deleteItem(deleteItem);
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      this.props.AppStore.getItems(nextProps.params.type)
    }
  }
  
  render () {
    const items = this.props.AppStore.items
    console.log("appstore items", items.length)
    console.log("AppStore", this.props.AppStore.itemType)
    return (
      <Layout className="ca-feed">
        {/* <DevTools /> */}
        <Header>
          <Create handleCreateItem={this.createItem} />
        </Header>
        <Content>
          <div className="ca-feed">
            <FeedItems items={items} deleteItem={this.deleteItem} />
          </div>
        </Content>
      </Layout>
    )
  } 
}

export default Feed;