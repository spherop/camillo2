import { computed, observable, action, autorun } from 'mobx'


class appStore {
  @observable items = []
  @observable itemType = 'items'
  @observable isLoading = true
  @observable isSaving = false
  
  getItems(itemType = null) {
    console.log("itemType", itemType)
    if (itemType) {
      this.itemType = itemType
    } else {
      this.itemType = "items"
    }
    $.getJSON('/' + this.itemType)
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
  
  @action createItem(values) {
    $.ajax({
      method: "POST",
      dataType: "json",
      url: `/${values.item_type}s`,
      data: { [values.item_type]: values }
    })
    .done((item) => {
      console.log("createdItem", item)
      this.itemType = values.item_type + "s"
      this.items.unshift(item)
      
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

// import { computed, observable, action, autorun } from 'mobx';
// 
// class CmStore {
// 	@observable count = 6;
// 	@computed get currentCount() {
// 		return this.count + 100;
// 	}
// 	increment() {
// 		this.count++;
// 	}
// }