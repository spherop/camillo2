import React from 'react';

import { Button, Modal, Form, Input, Radio, Icon, Select, message } from 'antd';
const FormItem = Form.Item;

const CreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, onSelect, form, itemType } = props;
    const { getFieldDecorator } = form;
    const Option = Select.Option;
    return (
      <Modal
        className="ca-create"
        visible={visible}
        title="Create an item"
        cancelText="Cancel"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form vertical>
          <FormItem>
            {getFieldDecorator('item_type', { 
              initialValue: "idea" 
            })(
              <Select placeholder="Select a type">
                <Option value="idea">Idea</Option>
                <Option value="creative_action">Creative Action</Option>
                <Option value="goal">Goal</Option>
              </Select>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Input title' }],
            })(
              <Input placeholder="Input title" autoFocus={true} />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('notes')(<Input type="textarea" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

class Create extends React.Component {
  state = {
    visible: false,
    itemType: "Idea",
  };
  showModal = () => {
    this.setState({ visible: true });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleSelect = ({ key }) => {
    message.info(`Clicked on item ${key}`);
    this.setState({
      itemType: key
    })
  };
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
    return (
      <div>
        <Button type="primary" onClick={this.showModal}><Icon type="plus-circle" /></Button>
        <CreateForm
          ref={this.saveFormRef}
          itemType={this.state.itemType}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          onSelect={this.handleSelect}
        />
      </div>
    );
  }
}
export default Create;
