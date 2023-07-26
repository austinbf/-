// pages/my/my.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    "name":'',
    "imgUrl":'',
    "show":false,
    "LogIn":true,
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
      {"text":'退出登录',
      "iconPath":"/images/icon/退出登录.png",
      "pagePath":"./indexItem/deleteMsg/deleteMsg"}
    ]
        },

 
  jumpTo(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
     url: this.data.settings[id].pagePath,
   })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 	//获取图片临时路径
    this.setData({
      avatarUrl,
    })
  },
  getUserName(e) {
    var name=e.detail.value.nickname;
   this.setData({
     name:e.detail.value.nickname
   })
   if(name){
     this.setData({
LogIn:false
     })
   }
  },
  showPopup() {
    this.setData({ show: true });
    console.log(this.data.show);
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