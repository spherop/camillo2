import React from 'react';
import { Button, Form, Input, Select, Row, Col } from 'antd';
const FormItem = Form.Item;

const SourceForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, onSelect, form, itemType, onFocus, onBlur } = props;
    const { getFieldDecorator } = form;
    const Option = Select.Option;

    return (
      <Form vertical>
        <Row>
          <Col span={23}>
            <h3>Add Source</h3>
            <div>
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Input title' }],
              })(
                <Input placeholder={`...title`} onPressEnter={onCreate} onFocus={onFocus} onBlur={onBlur} autoFocus={true} autoComplete="off" />
              )}
            </div>
            <div>
              {getFieldDecorator('subtitle', {
                rules: [{ required: true, message: 'Input subtitle' }],
              })(
                <Input placeholder={`...subtitle`} onFocus={onFocus} autoComplete="off" />
              )}
            </div>
            <FormItem>
              {getFieldDecorator('full_text')(<Input type="textarea" placeholder="full excerpt..." />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('short_text')(<Input type="textarea" placeholder="short excerpt..." />)}
            </FormItem>
            
            <FormItem>
              {getFieldDecorator('year')(<Input type="number" placeholder="year..." />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('url')(<Input type="text" placeholder="url..." />)}
            </FormItem>
          </Col>
          <Col span={1}>
            <FormItem>
              <Button className="ca-create-button" onClick={onCreate}>+</Button>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={4} offset={0}>
            <FormItem>
              {getFieldDecorator('source_type', { 
                initialValue: props.itemType
              })(
                <Select placeholder="Source a type">
                  <Option value="book">Book</Option>
                  <Option value="podcast">Podcast</Option>
                  <Option value="video">Video</Option>
                  <Option value="article">Article</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
);
export default SourceForm;