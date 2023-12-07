// pages/index/indexItem/upLoadText/upLoadText.js
const db = wx.cloud.database()
const {post,get} =require('../../../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noteTitle: '',
    noteContent: '',
    date:'',
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    show: false,
    formattedTime:'',
  },
  showPopup() {
    this.setData({ show: true });
  },
getRemindTime(value){
  const date = new Date(value.timeStamp);
      
      // 使用 Date 对象提供的方法获取各个部分的时间值
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();

      // 构建格式化后的时间字符串
      const formattedTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      
      // 更新显示的时间值
      this.formattedTime = formattedTime;
      console.log(this.data.formattedTime);

},
cancelTimeSet(){
  this.setData({ show: false });
},
confirmTimeSet() {
    this.setData({ show: false });
    wx.switchTab({
      url: '/pages/index/index',
    });  
    wx.showModal({
      title: '确认预约',
      content: '预约已确认，系统将在前三天天向您再次确认',
      showCancel: false,
    });
   
  },

  onTitleInput: function(e) {
    this.setData({
      noteTitle: e.detail.value
    });
  },

  onContentInput: function(e) {
    this.setData({
      noteContent: e.detail.value
    });
  },

  addNote: function() {
    const { noteTitle, noteContent ,date} = this.data;
    this.setData({
      "date":new Date(Date.parse(new Date())+ 60*60*1000*8).toISOString().substring(0,10)
    })
    if (noteTitle.trim() === '' || noteContent.trim() === '') {
      wx.showToast({
        title: '标题和内容不能为空',
        icon: 'none'
      });
      return;   
    }
    else{
      let id= wx.getStorageSync('id');
      let username=wx.getStorageSync('username');
      post('/event/add/'+id,{
        title:noteTitle,
        name:username,
        creatTime:date,
        content:noteContent,
        lng:"123",
        lat:"123",
        userId:id
       },{}).then(data => {
         console.log('请求成功', data);
       })
       .catch(error => {
         console.log('请求失败', error);
       });
      
       // 添加成功后，清空输入框
       this.setData({
         noteTitle: '',
         noteContent: ''
       });
       console.log(this.data.noteContent)
       this.setData({ show: true });
       wx.showToast({
         title: '添加成功'
       });
    }
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(options.eventId){
      let eventId=options.eventId;
      get('/event/get/'+eventId,{},{}).then(res => {
        console.log('请求成功', res);
        eventId='';
        this.setData({
          noteTitle:res.data.title,
          noteContent:res.data.content
        })
      })
      .catch(error => {
        console.log('请求失败', error);
      });
    }
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