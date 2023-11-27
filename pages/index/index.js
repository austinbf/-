import { createStoreBindings } from "mobx-miniprogram-bindings"
import {store} from '../../store/store'
// pages/index1/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentMonthAndDate: '',
"items":[
// {"text":'原理展示',
// "iconPath":"../../images/icon/主页/展示.png",
// "pagePath":"./indexItem/showPriciple/show"
// },

{"text":'上传信息',
"iconPath":"../../images/icon/主页/批量上传.png",
"pagePath":"./indexItem/upLoadText/upLoadText"},
{"text":'我的声明',
"iconPath":"../../images/icon/主页/隐藏.png",
"pagePath":"./indexItem/myMsg/myMsg"
},
// {"text":'上传录音',
// "iconPath":"../../images/icon/主页/批量上传.png",
// "pagePath":"./indexItem/upLoadRecord/upLoadRecord"},
// {"text":'上传视频',
// "iconPath":"../../images/icon/主页/批量上传.png",
// "pagePath":"./indexItem/upLoadVideo/upLoadVideo"},
// {"text":'声明删除',
// "iconPath":"../../images/icon/主页/取消.png",
// "pagePath":"./indexItem/deleteMsg/deleteMsg"}
]
  },
  updateMonthAndDate: function() {
    var that = this;
    var date = new Date();
    var month = date.getMonth() + 1; // 获取当前月份（注意要加1，因为月份是从0开始计数的）
    var day = date.getDate(); // 获取当前日期
    var currentMonthAndDate = month + '/' + day; // 拼接月份和日期
    that.setData({
      currentMonthAndDate: currentMonthAndDate
    });
  },
  jumpcover(){
    wx.navigateTo({
      url: 'pages/coverPage/cover',
    })
  },
  jumpTo(e){
      var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: this.data.items[id].pagePath,
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  this.storeBindings=createStoreBindings(this,{
    store,
    fields:[],
    actions:[]
  })
  this.updateMonthAndDate();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    this.storeBindings. destroyStoreBindings();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})