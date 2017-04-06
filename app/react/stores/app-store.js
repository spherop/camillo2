import { computed, observable, action, autorun } from 'mobx';
import { convertFromHTML, convertToRaw, ContentState, EditorState} from 'draft-js';
import mediumDraftExporter from 'medium-draft/lib/exporter';
import { message } from 'antd';

// Store for the general UI
class appStore {
  @observable createHasFocus = false; 
  
}
const AppStore = new appStore();
export default AppStore;
window.AppStore = AppStore;
