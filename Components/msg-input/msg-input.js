// Components/msg-input/msg-input.js
const db = wx.cloud.database();

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  /**
   * 组件的初始数据
   */
  data: {
    noteTitle: '',
    noteContent: '',
    date:''

  },

 

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      // event.detail 为当前输入的值
      console.log(event.detail);
    },
    
  },
})
