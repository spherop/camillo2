import React from 'react';
import { Col, Row, Input, Button } from 'antd';
import { observable } from 'mobx';

import {
  Editor,
  createEditorState,
} from 'medium-draft';

import { observer, inject } from 'mobx-react';

@inject(["FeedStore"]) @observer
class EditableItem extends React.Component {
  @observable itemTitle = "";
  constructor(props) {
    super(props);
  }
  
  onEditorStateChange = (editorState) => {
    this.props.item.editorState = editorState
  }
  
  onSaveFeedItem = () => {
    this.props.FeedStore.saveFeedItem(this.props.item);
  }
  
  componentWillMount() {
    this.itemTitle = this.props.item.title;
  }

  render () {
    const item = this.props.item;
    console.log("rendering item", item)
    let editorState = item.loading ? null : item.editorState;
    if (!editorState) {
      editorState = createEditorState();
    }
    return (
      <div>
        <Row>
          <Col span={2} className="pd-l-1">
            <Button type="dashed" onClick={this.onSaveFeedItem}>Save</Button>
          </Col>
        </Row>
        <Row>
          <Col span={22} offset={1}>
            <Editor
              ref="editor"
              placeholder="notes..."
              editorState={editorState}
              onChange={this.onEditorStateChange} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default EditableItem;