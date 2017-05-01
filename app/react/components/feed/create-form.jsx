import React from 'react';
import { Button, Form, Input, Select, Row, Col } from 'antd';
import _ from 'lodash';
_.mixin(require("lodash-inflection"));

import {
  Editor,
  createEditorState,
} from 'medium-draft';

const FormItem = Form.Item;
require("./create-form.css.scss");

const CreateForm = Form.create()(
  (props) => {
    let editorState = props.item.loading ? null : props.item.editorState;
    const { visible, onCancel, onCreate, onSelect, form, itemType, onFocus, onBlur } = props;
    const { getFieldDecorator } = form;
    const Option = Select.Option;
    return (
      <Form vertical className="ca-create-form">
        <Row>
          <Col span={21} offset={0}>
            <div className="">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Input title' }],
              })(
                <Input className="ca-create-input" 
                  placeholder={`+ new ${_.singularize(props.itemType)}`} 
                  onPressEnter={onCreate} 
                  onFocus={onFocus} 
                  onBlur={onBlur} 
                  autoComplete="off" />
              )}
            </div>
          </Col>
          <Col span={2}>
            {getFieldDecorator('item_type', { 
              initialValue: props.itemType
            })(
              <input type="hidden" name="item_type" />
            )}
            <Button className="ca-create-button" onClick={onCreate}>+</Button>
          </Col>
        </Row>
        { props.showEditor &&
          <Row>
            <Col span={21}>
              <Editor
                ref="editor"
                editorState={editorState}
                onFocus={onFocus} 
                onBlur={onBlur} 
                onChange={props.onEditorStateChange} />
            </Col>
          </Row>
        }
      </Form>
    );
  }
);
export default CreateForm;