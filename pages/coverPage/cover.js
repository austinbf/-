// pages/coverPage/cover.js
const{deleteRequest,post}=require('../../utils/request');
Page({

  /**
   * 页面的初始数据
   */
  data: {
pass:'no',
password:"",
show:true,
deleteConfirm:'',
eventId:'',
deleteMsg:false,
checkMsg:false,
batchDelete:false,
beforeUse:'',
selectedIds:''
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
        pass: "yes",
      })
      console.log(this.data);
      const {eventId,deleteMsg,checkMsg,batchDelete,beforeUse,selectedIds}=this.data;
      if(checkMsg){
        wx.redirectTo({
          url:'/pages/index/indexItem/upLoadText/upLoadText?eventId='+eventId
        })
       this.setData({
         checkMsg:false
       })
      }
      else if(deleteMsg){
        deleteRequest('/event/delete/'+eventId,{},{}).then(res=>{
          console.log('请求成功',res.data);
          this.setData({
            eventId:'',
            deleteMsg:false
          })
          wx.showToast({
            title: '删除成功',
            icon:'none'
          })
          wx.switchTab({
            url: '/pages/index/indexItem/myMsg/myMsg',
          });
        })
        .catch(error => {
          console.log('请求失败', error);
        });
      }
      else if(batchDelete==true){
        wx.setStorageSync('isAuthenticated', true); // 保存认证状态到本地缓存
        post('/event/delete/batch', selectedIds, {}).then(res => {
          console.log('请求成功', res.data);
          // 删除后更新数据源
          wx.switchTab({
            url: '/pages/index/indexItem/myMsg/myMsg',
          })
          wx.showToast({
            title: '删除成功',
            icon: 'none'
          });
        }).catch(error => {
          console.log('请求失败', error);
        });
        this.setData({
          batchDelete: false
        });
      }
      else if(beforeUse){
wx.switchTab({
  url: '/pages/index/index',
})
wx.setStorageSync('confirmLogIn', true);
      }
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
let deleteMsg=options.deleteMsg;
let checkMsg=options.checkMsg;
let batchDelete=options.batchDelete;
let beforeUse=options.beforeUse;
console.log(options);
if(options.selectedIds){
  const encodedJsonArrayString = options.selectedIds;
  const jsonArrayString = decodeURIComponent(encodedJsonArrayString);
  const passedArray = JSON.parse(jsonArrayString);
  console.log(passedArray); // 输出传递过来的数组
  this.setData({
    selectedIds:passedArray,
    batchDelete:true
  })
}

this.setData({
  eventId:eventId,
  deleteMsg:deleteMsg,
  checkMsg:checkMsg,
  beforeUse:beforeUse,
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