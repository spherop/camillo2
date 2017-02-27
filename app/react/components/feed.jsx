import 'antd/dist/antd.css';
import React from 'react';
import Create from './create';
import FeedItems from './feed-items';
import { Layout } from 'antd';
const { Header, Content } = Layout;
// import update from 'immutability-helper'; // https://github.com/kolodny/immutability-helper - recommended for react mutations


class Feed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [{title: "loading"}],
      itemsFilter: '/items',
    }
    
  }
  
  getItems = () => {
    $.getJSON(this.state.itemsFilter)
    .done((data) => {
      console.log("items", data)
      this.setState({
        items: data
      });
    })
    .fail(() => {
      // TODO handle errors more gracefully
      alert("WEAK ASS SHIT");
    })
    .always(() => { });
  }
  
  componentWillMount() {
    this.getItems()
  }
  
  createItem = (values) => {
    $.ajax({
      method: "POST",
      dataType: "json",
      url: `/${values.item_type}s`,
      data: { [values.item_type]: values }
    })
    .done((data) => {
      console.log("createItemzz", data)
      let newItems = this.state.items;
      newItems.unshift(data)
      this.setState( {
        items: newItems,
      })
    })
    .fail(() => {
      alert("nope")
    });
  }
  
  deleteItem = (deleteItem) => {
    $.ajax({
      method: "DELETE",
      dataType: "json",
      url: `/items/${deleteItem.id}`
    })
    .done((data) => {
      const remainder = this.state.items.filter((item) => {
        if(item.id !== deleteItem.id) return item;
      });
      this.setState({
        items: remainder
      })
    })
    .fail(() => {
      alert("nope")
    });
  }
  
  render () {
    const items = this.state.items;
    return (
      <Layout className="ca-feed">
        <Header>
          <Create handleCreateItem={this.createItem} />
        </Header>
        <Content>
          <div className="ca-feed">
            <FeedItems items={this.state.items} deleteItem={this.deleteItem} />
          </div>
        </Content>
      </Layout>
    )
  } 
}

export default Feed;