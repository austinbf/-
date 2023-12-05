// pages/loginAndregister/loginAndRegister.js
const { get, post } = require('../../utils/request');
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    checkboxValue: false,
    loginName: '', // 登录名
    loginPassword: '', // 登录密码
    registerName: '', // 注册用户名
    registerPassword: '', // 注册密码
    confirmPassword: '', // 确认密码
    current:1,
  },
  click(e){
    let index = e.currentTarget.dataset.code;
    this.setData({
      current:index
    })
  },
  handleCheckboxChange(event) {
    console.log('this.data.checkboxValue ==> ' , this.data.checkboxValue);
    this.setData({
      // 点击之后进行取反
      checkboxValue : !this.data.checkboxValue
    })
  },
  inputChange(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({
      [field]: e.detail.value
    });
  },
  submitLogin(e) {
    const { loginName, loginPassword } = this.data;
    if(this.data.checkboxValue){
      post('/login',{
        username:loginName,
        password:loginPassword 
      }).then(data => {
        console.log('请求成功', data);
        wx.showToast({
          title: '登录成功',
          icon:'none'
        })
        
          wx.navigateTo({
            url: 'pages/index/index',
          });
      
        
      })
      .catch(error => {
        console.log('请求失败', error);
      });
    }
    else{
      wx.showToast({
        title: '请先同意并勾选',
        icon:'none'
      })
    }
  },
  submitRegister(e){
    const{ registerName,registerPassword, confirmPassword}=this.data;
    if(registerPassword==confirmPassword&&this.data.checkboxValue){
      post('/register',{
        username:registerName,
        password:registerPassword
      }).then(data => {
        console.log('请求成功', data);
        wx.showToast({
          title: '注册成功',
          icon:'none'
        })
        setTimeout(function() {
          wx.navigateTo({
            url: '/pages/index/index',
          });
        }, 2000);
        
      })
      .catch(error => {
        console.log('请求失败', error);
      });
    }
    else if(registerPassword!=confirmPassword){
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
register(){
  // post('/register',{
  //   username:'five456',
  //   password:'123123'
  // }).then(data => {
  //   console.log('请求成功', data);
  // })
  // .catch(error => {
  //   console.log('请求失败', error);
  // });
  wx.navigateTo({
    url: '/pages/register/register',
  })
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