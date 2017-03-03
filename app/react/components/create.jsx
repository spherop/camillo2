import React from 'react';
import { observer, inject } from 'mobx-react'
import { Button, Icon, Row, Col, Form } from 'antd';
import CreateForm from './form/create-form'


@inject(["AppStore"]) @observer
class Create extends React.Component {
  state = {
    visible: false,
    // itemType: "Idea",
  };
  showModal = (itemType) => {
    this.setState({ visible: true });
    this.focus()
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleFocus = () => {
    this.props.AppStore.createHasFocus = true;
  }
  handleBlur = () => {
    this.props.AppStore.createHasFocus = false;
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
    const createTypeText = this.props.AppStore.createItemText
    const itemType = this.props.AppStore.itemType
    return (
      <div className="ca-create">
        <CreateForm
          ref={this.saveFormRef}
          itemType={itemType}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          onSelect={this.handleSelect}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </div>
    );
  }
}
export default Create;
