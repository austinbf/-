import { createStoreBindings } from "mobx-miniprogram-bindings"
import {store} from '../../store/store'
// pages/index1/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
"items":[
{"text":'原理展示',
"iconPath":"../../images/icon/主页/展示.png",
"pagePath":"./indexItem/showPriciple/show"
},
{"text":'我的声明',
"iconPath":"../../images/icon/主页/隐藏.png",
"pagePath":"./indexItem/myMsg/myMsg"
},
{"text":'上传文字',
"iconPath":"../../images/icon/主页/批量上传.png",
"pagePath":"./indexItem/upLoadText/upLoadText"},
{"text":'上传录音',
"iconPath":"../../images/icon/主页/批量上传.png",
"pagePath":"./indexItem/upLoadRecord/upLoadRecord"},
{"text":'上传视频',
"iconPath":"../../images/icon/主页/批量上传.png",
"pagePath":"./indexItem/upLoadVideo/upLoadVideo"},
{"text":'声明删除',
"iconPath":"../../images/icon/主页/取消.png",
"pagePath":"./indexItem/deleteMsg/deleteMsg"}]
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