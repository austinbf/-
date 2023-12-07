// pages/index/indexItem/myMsg/myMsg.js
const { get, post,deleteRequest } = require('../../../../utils/request');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myMsgDataObj:'',
    selectedItems: [],
    result: ['a', 'b'],
    batchDelete:false
  },
  fullMsg(e){
    let eventId=e.currentTarget.dataset.id;

wx.redirectTo({
  url: '/pages/coverPage/cover?eventId='+eventId+'&checkMsg=true',
})
  },
  checkboxChange(e) {
   let id=e.currentTarget.dataset.id;
    let checked=e.currentTarget.dataset.checked;
    const updatedData = this.data.myMsgDataObj.map(item => {
      if (item.id === id) {
        item.checked =!item.checked ;
        console.log(id);
      }
      return item;
    });

    this.setData({
      myMsgDataObj: updatedData
    });
    console.log(updatedData);
  },
  batchDelete() {
    const selectedItems = this.data.myMsgDataObj.filter(item => item.checked === true);
    const selectedIds = selectedItems.map(item => item.id);
    // 执行删除操作，调用 API 或更新数据源等
    console.log('选中的待删除项：', selectedItems);
    console.log('选中项的 ID：', selectedIds);
    wx.redirectTo({
      url: '/pages/coverPage/cover?batchDelete='+false,
    })
    if(this.data.batchDelete){
      post('/event/delete/batch', selectedIds, {}).then(res => {
        console.log('请求成功', res.data);
        // 删除后更新数据源
        const updatedData = this.data.myMsgDataObj.filter(item => item.checked === false);
        this.setData({
          myMsgDataObj: updatedData
        });
        wx.showToast({
          title: '删除成功',
          icon: 'none'
        });
      }).catch(error => {
        console.log('请求失败', error);
      });
    }  
  },
  
  onClose(e) {
    let eventId=e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认删除',
      content: '是否确认删除该条记录？',
      success(res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '../../../coverPage/cover?eventId='+eventId+'&deleteMsg=true'
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
    if(options.batchDelete){
      let batchDelete=options.batchDelete;
      this.setData({
        batchDelete:batchDelete
      });
    }
   
get('/event/users/'+id,{},{}).then(res => {
  console.log('请求成功', res);
  res.data.forEach((item) => {
    const createDate = new Date(item.createTime);
    const formattedDate = createDate.toLocaleDateString();
    item.createTime = formattedDate;
  });
  res.data=res.data.map(item=>{
    return {
      ...item,
      checked:false
    };
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