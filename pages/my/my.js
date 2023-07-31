// pages/my/my.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app=getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    "theme": wx.getSystemInfoSync().theme,
    "show":false,
    "show1":false,
    "showLogIn":true,
    "nickName":'',
    "avatarUrl": defaultAvatarUrl,
    "value": '',
    "settings":[
      {"text":'招募合伙人',
      "iconPath":"/images/icon/icon-person-hezuo2.png",
      "pagePath":"/pages/my/settingsPages/zhaomu/zhaomu"
      },
      {"text":'常用信息编辑',
      "iconPath":"/images/icon/编辑.png",
      "pagePath":"/pages/my/settingsPages/edit/edit"
      },
      {"text":'紧急呼叫',
      "iconPath":"/images/icon/电话.png",
      "pagePath":"/pages/my/settingsPages/emergency/emergency"},

      {"text":'关于我们',
      "iconPath":"/images/icon/关于我们.png",
      "pagePath":"/pages/my/settingsPages/aboutUs/aboutUs"
    },
      {"text":'敬请期待...',
      "iconPath":"/images/icon/敬请期待.png",
      "pagePath":"/pages/my/settingsPages/future/future"
    },
      // {"text":'退出登录',
      // "iconPath":"/images/icon/退出登录.png",
      // "pagePath":"./indexItem/deleteMsg/deleteMsg",}
    ]
        },

 
  jumpTo(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
     url: this.data.settings[id].pagePath,
   })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
   
    this.setData({
      avatarUrl,
    })
    if(this.data.avatarUrl==defaultAvatarUrl){
      wx.showToast({
        title: '头像不能为空',
        icon:'error'
      })
    }
    app.globalData.userInfo.avatarUrl = avatarUrl
  
  },
  getUserName(e) {
    app.globalData.userInfo.nickName = e.detail.value.nickname
     this.setData({
      nickName:e.detail.value.nickname
     })
     if(this.data.nickName){
      this.setData({ showLogIn: false });
     }
     else
     {
       wx.showToast({
         title: '昵称不能为空',
         icon:'error'
       })
     }
  },
  logIn() {
    this.setData({ show: true });
  let db=wx.cloud.database();
    console.log(this.data.show);
  },
logOut(){
this.setData({
  avatarUrl:defaultAvatarUrl,
  nickName:'',
  show1:false,
  showLogIn:true
})
},
cancelLogOut(){
  this.setData({
    show1:false
  })
},
showPopup(){
  this.setData({ show1: true });
},
  onClose() {
    this.setData({ show: false });
  },
  jumpToLogIn(){
    wx.navigateTo({
      url: '/pages/logIn/logIn',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.onThemeChange((result) => {
      this.setData({
        theme: result.theme
      })
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
    if(wx.getStorageSync('$imgUrl')){
var imgUrl=wx.getStorageSync('$imgUrl')
       console.log(wx.getStorageSync('$imgUrl')) 
       this.setData({
         imgUrl:imgUrl
       })
  }
  if(wx.getStorageSync('$name')){
    var name=wx.getStorageSync('$name');
    this.setData({
      name:name
    })
    console.log(wx.getStorageSync('$name'))
}
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