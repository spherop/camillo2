import { computed, observable, action, autorun } from 'mobx'


class appStore {
  @observable items = []
  @observable item = {title: "loading", notes: "...", item_type: "..."}
  @observable itemType = 'item'

  @observable isLoading = true
  @observable isSaving = false
  @observable createVisible = false
  @observable createHasFocus= false
  
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
    .fail(() => {
      // TODO handle errors more gracefully
      alert("WEAK ASS SHIT");
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
      
      // this.items = this.items.filter((item) => item.item_type === this.itemType);
      // this.getItems(values.item_type)
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
