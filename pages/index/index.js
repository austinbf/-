// index.js
Page({
  data: {
   active:0,

  },
  onChange(event){
    this.setData({ active: event.detail });
    
  }

})
