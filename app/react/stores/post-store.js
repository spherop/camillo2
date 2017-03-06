import { computed, observable, action, autorun } from 'mobx'
import { convertFromHTML, convertToRaw, ContentState, EditorState} from 'draft-js';
import mediumDraftExporter from 'medium-draft/lib/exporter';
import { message } from 'antd'
import moment from 'moment'

class postStore {
  @observable posts = []
  @observable post = {
    title: "loading", 
    body: "...",
    loading: false,
    editMode: false,
    editorState: EditorState.createEmpty()
  }
  @observable contentDirty = false
  
  @computed get niceDate(){
    console.log("nice-date", this.post.updated_at)
    return moment(this.post.updated_at).fromNow()
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
      if (post.body) {
        const contentBlocks = convertFromHTML(post.body)
        const contentState = ContentState.createFromBlockArray(contentBlocks);
        this.post.editorState = EditorState.createWithContent(contentState)
      } else {
        this.post.editorState = null
      }
      Object.assign(this.post, post)      
      this.post.loading = false
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
    const bodyHTML = mediumDraftExporter(this.post.editorState.getCurrentContent());
    $.ajax({
      method: "PUT",
      dataType: "json",
      url: "/posts/" + this.post.id,
      data: { post: { id: this.post.id, title: this.post.title, body: bodyHTML } }
    })
    .done((post) => {
      console.log("Saved", post)
      this.contentDirty = false
      if (post.body) {
        const contentBlocks = convertFromHTML(post.body)
        const contentState = ContentState.createFromBlockArray(contentBlocks);
        this.post.editorState = EditorState.createWithContent(contentState)
      } else {
        this.post.editorState = null
      }
      Object.assign(this.post, post)
      this.post.loading = false
      window.post = this.post
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
  
}

const PostStore = new postStore();
export default PostStore;
window.PostStore = PostStore;