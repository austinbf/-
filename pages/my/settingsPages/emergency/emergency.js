// pages/my/settingsPages/emergency/emergency.js
var amapFile = require('../../../../libs/amap-wx.130.js'); //高德js
var config = require('../../../../libs/config.js'); //引用我们的配置文件  
var key = config.config.key;
var myAmapFun = new amapFile.AMapWX({
    key: key
});

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   
    myAmapFun.getRegeo({
      success: (data) => {
          // 保存位置的描述信息（ longitude经度 latitude纬度 和位置信息 ）
          let textData = {};
          textData.name = data[0].name;
          textData.desc = data[0].desc
          // 🎈 将获取的信息保存
          this.setData({
            textData: textData,
            longitude: data[0].longitude,
            latitude: data[0].latitude,
            // 🎈 给该经度纬度加上icon做标记，并调节大小
            markers: [{
              latitude: data[0].latitude,
              longitude: data[0].longitude,
              height: 30,
              width: 35,
              iconPath: '../../imgs/locationIcon/site1.png'
            }]
          })
        },
        fail: function(info){
          console.log("get Location fail");
        }    
      });
  
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
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        console.log(res);
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
      }
     
     })
         
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