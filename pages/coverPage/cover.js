// pages/coverPage/cover.js
const{deleteRequest}=require('../../utils/request');
Page({

  /**
   * 页面的初始数据
   */
  data: {
pass:'no',
password:"",
show:true,
deleteConfirm:'',
eventId:''
  },
  

 
  onPasswordChange(e) {
    this.setData({
      password: e.detail.value,
    });
  },
  onSubmit() {
    let password1=wx.getStorageSync('password');
    // 进行验证逻辑，验证成功后跳转
    if (this.data.password == password1) {
      this.setData({
        pass: "yes"
      })
      const {eventId}=this.data;
      if(eventId){
        deleteRequest('/event/delete/'+eventId,{},{}).then(res=>{
          console.log('请求成功',res.data);
          this.setData({
            eventId:''
          })
          wx.showToast({
            title: '删除成功',
            icon:'none'
          })
        })
        .catch(error => {
          console.log('请求失败', error);
        });
      }
      wx.redirectTo({
        url: '/pages/index/indexItem/myMsg/myMsg',
      });
    } else {
      wx.showToast({
        title: '输入错误',
        icon:'error'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
let eventId=options.eventId;
console.log(eventId);
this.setData({
  eventId:eventId
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