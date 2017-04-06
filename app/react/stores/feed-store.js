import { computed, observable, action, autorun } from 'mobx'
import { convertFromHTML, convertToRaw, ContentState, EditorState} from 'draft-js';
import mediumDraftExporter from 'medium-draft/lib/exporter';
import { message } from 'antd'

class feedStore {
  @observable items = []
  @observable item = {
    title: "loading", 
    notes: "...", 
    loading: false,
    item_type: "...",
    editorState: EditorState.createEmpty()
  }
  @observable itemType = 'item'
  @observable loading = true
  @observable isSaving = false
  
  sing(str) {
    if (str && str.slice(-1) === "s") {
      str = str.slice(0, -1)
    }
    return str
  }
  
  plur(str) {
    if (str.slice(-1) !== "s") {
      str += "s"
    }
    return str
  }
  
  @computed get createItemText() {
    const typeName = (this.itemType != "item") ? this.itemType : "idea"
    const cTypeName = typeName.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()).slice(0, -1);
    return cTypeName;
  }
  
  getItem(id) {
    this.item.loading = true
    $.getJSON('/items/' + id)
    .done((item) => {
      console.log("get item", item)
      let contentState = null
      if (item.notes) {
        const contentBlocks = convertFromHTML(item.notes)
        const contentState = ContentState.createFromBlockArray(contentBlocks);
        this.item.editorState = EditorState.createWithContent(contentState)
      } else {
        this.item.editorState = null
      }
      this.item.loading = false
      Object.assign(this.item, item)
    })
    .fail(() => {
      // TODO handle errors more gracefully
      alert("couldn't get item");
    })
    .always(() => { });
  }
  
  getItems(itemType = null) {
  
    this.loading = true
    if (itemType) {
      this.itemType = itemType
    } else {
      this.itemType = "item"
    }
    $.getJSON('/' + this.plur(this.itemType))
    .done((data) => {
      console.log("data", data)
      this.items = data
      this.loading = false
    })
    .fail((result) => {
      message.error(result.responseText)
    })
    .always(() => { });
  }
  
  @action createItem(values) {
    let type
    if (values.item_type) {
      values.item_type = this.sing(values.item_type)
      type = this.plur(values.item_type)
    } else if (values.source_type) {
      type = "sources" 
    }
    
    $.ajax({
      method: "POST",
      dataType: "json",
      url: `/${type}`,
      data: { [this.sing(type)]: values }
    })
    .done((item) => {
      console.log("createdItem", item)
      this.itemType = type
      this.items.unshift(item)
      Object.assign(this.item, item)
    })
    .fail(() => {
      alert("FAILED THAT ONE YO!")
    });
  }
  
  @action saveItem() {
    if (!this.item.editorState) {
      return
    }
    const notesHTML = mediumDraftExporter(this.item.editorState.getCurrentContent());
    $.ajax({
      method: "PUT",
      dataType: "json",
      url: "/items/" + this.item.id,
      data: { item: { id: this.item.id, notes: notesHTML, title: this.item.title } }
    })
    .done((item) => {
      // message.success('Item saved');
      Object.assign(this.item, item)
    })
    .fail(() => {
      alert("FAILED THAT ONE YO!")
    });
  }
  
  @action deleteItem(deleteItem) {
    $.ajax({
      method: "DELETE",
      dataType: "json",
      url: `/items/${deleteItem.id}`
    })
    .done((data) => {
      message.success("Items deleted")
      const remainder = this.items.filter((item) => {
        if(item.id !== deleteItem.id) return item;
      });
      this.items = remainder
    })
    .fail(() => {
      alert("nope")
    });
  }  
  
  
}

const FeedStore = new feedStore();
export default FeedStore;
window.FeedStore = FeedStore;