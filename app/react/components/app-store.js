import { computed, observable, action, autorun } from 'mobx'
import { convertFromHTML, convertToRaw, ContentState, EditorState} from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
import mediumDraftExporter from 'medium-draft/lib/exporter';
import { message } from 'antd'

class appStore {
  @observable items = []
  @observable item = {title: "loading", notes: "...", item_type: "..."}
  
  @observable posts = []
  @observable post = {
    title: "loading", 
    body: "...",
    loading: false,
    editMode: false,
    contentState: {},
    editorContent: undefined,
    editorState: EditorState.createEmpty()
  }
  @observable contentDirty = false
  @observable itemType = 'item'
  @observable isLoading = true
  @observable isSaving = false
  @observable createVisible = false
  @observable createHasFocus = false
  
  sing(str) {
    if (str.slice(-1) === "s") {
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
  
  getPosts() {
    $.getJSON('/posts')
    .done((data) => {
      console.log("posts", data)
      this.posts = data
    })
    .fail(() => {
      // TODO handle errors more gracefully
      alert("Could not get posts");
    })
    .always(() => { });
  }
  
  getPost = (id) => {
    this.post.loading = true
    $.getJSON('/posts/' + id)
    .done((post) => {
      console.log("get post", post)
      
      this.contentDirty = false
      const contentBlocks = convertFromHTML(post.body)
      this.post.contentState = ContentState.createFromBlockArray(contentBlocks);
      this.post.editorState = EditorState.createWithContent(this.post.contentState)
      this.post.loading = false
      Object.assign(this.post, post)
      // this.post.id = post.id
      // this.post.body = post.body
      // this.post.title = post.title
      // this.post.created_at = post.created_at
      
      window.post = this.post
      
    })
    .fail(() => {
      // TODO handle errors more gracefully
      alert("Could not get post");
    })
    .always(() => { });
  }
  
  savePost = () => {
    if (!this.contentDirty) {
      return false
    }
    console.log("saving")
    // const bodyHTML = draftToHtml(this.post.editorContent, {})
    const bodyHTML = mediumDraftExporter(this.post.editorState.getCurrentContent());
    $.ajax({
      method: "PUT",
      dataType: "json",
      url: "/posts/" + this.post.id,
      data: { post: { id: this.post.id, title: this.post.title, body: bodyHTML } }
    })
    .done((post) => {
      console.log("Saved", post)
      const contentBlocks = convertFromHTML(post.body)
      this.post.contentState = ContentState.createFromBlockArray(contentBlocks);
      this.post.id = post.id
      this.post.body = post.body
      this.post.title = post.title
      this.post.editorState = EditorState.createWithContent(this.post.contentState)
      this.contentDirty = false
    })
    .fail(() => {
      // message.error("Trouble in saving post")
    });
    return true
  }
  
  createPost = () => {
    console.log("creating")
    $.ajax({
      method: "POST",
      dataType: "json",
      url: "/posts",
      data: { post: {title: "Untitled Postling"} }
    })
    .done((post) => {
      this.post.id = post.id
      this.post.body = ""
      this.post.title = post.title
      this.post.editorState = null
      this.contentDirty = false
    })
    .fail(() => {
      // message.error("Trouble in saving post")
    });
    return true
  }
  
  getItems(itemType = null) {
    if (itemType) {
      this.itemType = itemType
    } else {
      this.itemType = "item"
    }
    $.getJSON('/' + this.plur(this.itemType))
    .done((data) => {
      console.log("items", data)
      this.items = data
    })
    .fail((result) => {
      // TODO handle errors more gracefully
      // alert(result);
      message.error(result.responseText)
    })
    .always(() => { });
  }
  
  @action showCreate() {
    this.createVisible = true;
  }
  
  @action createItem(values) {
    console.log("CREATE", values)
    values.item_type = this.sing(values.item_type)
    $.ajax({
      method: "POST",
      dataType: "json",
      url: `/${this.plur(values.item_type)}`,
      data: { [values.item_type]: values }
    })
    .done((item) => {
      console.log("createdItem", item)
      this.itemType = values.item_type
      this.items.unshift(item)
      this.item = item
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
      
      const remainder = this.items.filter((item) => {
        if(item.id !== deleteItem.id) return item;
      });
      this.items = remainder
    })
    .fail(() => {
      alert("nope")
    });
  }
  constructor() {
    
  }
  
}

const AppStore = new appStore();
export default AppStore;
window.AppStore = AppStore;
