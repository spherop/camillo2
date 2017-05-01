import React from 'react';
import { observer, inject } from 'mobx-react'
import { Button, Icon, Row, Col, Form } from 'antd';
import { Link, browserHistory } from 'react-router'
import CreateForm from './create-form'
import SourceForm from './source-form'


@inject("FeedStore", "UiStore") @observer
class Create extends React.Component {
  state = {
    visible: false,
  };
  
  handleCancel = () => {
    this.setState({ visible: false });
  }
  
  handleFocus = () => {
    this.props.UiStore.setCreateHasFocus(true);
    // this.props.UiStore.createHasFocus = true;
  }
  
  handleBlur = () => {
    this.props.UiStore.setCreateHasFocus(false);
    // this.props.UiStore.createHasFocus = false;
  }
  
  componentWillMount() {
    // console.log("create", browserHistory.getCurrentLocation().pathname)
    
  }
  
  onEditorStateChange = (editorState) => {
    this.props.FeedStore.contentDirty = true
    this.props.FeedStore.item.editorState = editorState
  }

  handleCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
      this.props.handleCreateItem(values);
    });
  }
  
  saveFormRef = (form) => {
    this.form = form;
  }
  
  render() {
    const createTypeText = this.props.FeedStore.createItemText
    const itemType = this.props.FeedStore.itemType
    // console.log("feedStore", this.props.FeedStore.itemType)
    const isSource = (this.props.FeedStore.itemType == "sources")
    if (!isSource) {
      return (
        <div className="ca-create">
          <CreateForm
            ref={this.saveFormRef}
            itemType={itemType}
            item={this.props.FeedStore.item}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            onSelect={this.handleSelect}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            showEditor={this.props.UiStore.createHasFocus}
            onEditorStateChange={this.onEditorStateChange}
          />
        </div>
      )
    } else {
      return (
        <SourceForm
          ref={this.saveFormRef}
          itemType={itemType}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          onSelect={this.handleSelect}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      )
    }
    
  }
}
export default Create;
