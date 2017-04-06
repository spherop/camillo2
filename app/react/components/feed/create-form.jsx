import React from 'react';
import { Button, Form, Input, Select, Row, Col } from 'antd';
const FormItem = Form.Item;
require("./create-form.css.scss");

const CreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, onSelect, form, itemType, onFocus, onBlur } = props;
    const { getFieldDecorator } = form;
    const Option = Select.Option;
    return (
      <Form vertical className="ca-create-form">
        <Row>
          <Col span={17} offset={1}>
            <div className="">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Input title' }],
              })(
                <Input className="ca-create-input" placeholder={`+ add`} onPressEnter={onCreate} onFocus={onFocus} onBlur={onBlur} autoComplete="off" />
              )}
            </div>
          </Col>
          <Col span={4}>
            <FormItem>
              {getFieldDecorator('item_type', { 
                initialValue: props.itemType
              })(
                <input type="hidden" name="item_type" />
              )}
            </FormItem>
          </Col>
          <Col span={2}>
            <Button className="ca-create-button" onClick={onCreate}>+</Button>
          </Col>
        </Row>
      </Form>
    );
  }
);
export default CreateForm;