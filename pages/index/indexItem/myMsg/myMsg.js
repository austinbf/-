// pages/index/indexItem/myMsg/myMsg.js
const { get, post } = require('../../../../utils/request');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myMsgDataObj:'',
  },
  getId(e){
    console.log(e);
  },
  onClose(e) {
    let eventId=e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认删除',
      content: '是否确认删除该条记录？',
      success(res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '../../../coverPage/cover?eventId='+eventId
          })
        }
      }
    })
  },
showData(){


console.log(this.data.myMsgDataObj);
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let id=wx.getStorageSync('id');
get('/event/users/'+id,{},{}).then(res => {
  console.log('请求成功', res);
  res.data.forEach((item) => {
    const createDate = new Date(item.createTime);
    const formattedDate = createDate.toLocaleDateString();
    item.createTime = formattedDate;
  });
  this.setData({
    myMsgDataObj:res.data
  })
})
.catch(error => {
  console.log('请求失败', error);
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