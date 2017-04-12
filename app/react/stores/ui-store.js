import { computed, observable, action, autorun } from 'mobx';
import { convertFromHTML, convertToRaw, ContentState, EditorState} from 'draft-js';
import mediumDraftExporter from 'medium-draft/lib/exporter';
import { message } from 'antd';

// Store for the general UI
class uiStore {
  @observable createHasFocus = false; 
  @observable feedNavVisible = false; 
  
  @action toggleFeedNav() {
    this.feedNavVisible = !this.feedNavVisible;
  }
  
}
const UiStore = new uiStore();
export default UiStore;
window.UiStore = UiStore;
