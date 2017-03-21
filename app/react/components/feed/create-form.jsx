import React from 'react';
import { Button, Form, Input, Select, Row, Col } from 'antd';
const FormItem = Form.Item;

const CreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, onSelect, form, itemType, onFocus, onBlur } = props;
    const { getFieldDecorator } = form;
    const Option = Select.Option;

    return (
      <Form vertical>
        <Row>
          <Col span={23}>
            <div>
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Input title' }],
              })(
                <Input placeholder={`...${itemType.replace("_", " ")}`} onPressEnter={onCreate} onFocus={onFocus} onBlur={onBlur} autoComplete="off" />
              )}
            </div>
            <FormItem style={{display: "none"}}>
              {getFieldDecorator('notes')(<Input type="textarea" placeholder="Notes..." />)}
            </FormItem>
          </Col>
          <Col span={1}>
            <FormItem>
              <Button className="ca-create-button" onClick={onCreate}>+</Button>
            </FormItem>
          </Col>
        </Row>
        <Row style={{display: "none"}}>
          <Col span={6} offset={18}>
            <FormItem>
              {getFieldDecorator('item_type', { 
                initialValue: props.itemType
              })(
                <Select placeholder="Select a type">
                  <Option value="idea">Idea</Option>
                  <Option value="creative_action">Creative Action</Option>
                  <Option value="goal">Goal</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
);
export default CreateForm;