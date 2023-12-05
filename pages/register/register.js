// pages/register/register.js
const { get, post } = require('../../utils/request');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkboxValue: false,
    formData: {
      username: '',
      password: '',
    },

  },

  handleCheckboxChange(event) {
    console.log('this.data.checkboxValue ==> ' , this.data.checkboxValue);
    this.setData({
      // 点击之后进行取反
      checkboxValue : !this.data.checkboxValue
    })
 
  },
register(data){
  var username=data.detail.value.username;
  var password=data.detail.value.password;
  var password1=data.detail.value.password1;
  if(password==password1&&this.data.checkboxValue){
    post('/register',{
      username:username,
      password:password
    }).then(data => {
      console.log('请求成功', data);
      wx.showToast({
        title: '注册成功',
        icon:'none'
      })
      setTimeout(function() {
        wx.navigateTo({
          url: '/pages/loginAndregister/loginAndRegister',
        });
      }, 2000);
      
    })
    .catch(error => {
      console.log('请求失败', error);
    });
  }
  else if(password!=password1){
    wx.showToast({
      title: '密码输入错误，请重试',
      icon:'none'
    })
  }
  else if(!this.data.checkboxValue){
    wx.showToast({
      title: '请先同意并勾选',
      icon:'none'
    })
  }
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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