const { get, post,deleteRequest } = require('../../../../utils/request');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myFileDataObj:'',

  },
  submitFile(e){
wx.chooseMessageFile({//调用选择文件接口
  count:Number(e.currentTarget.dataset.num),//文件数量
  type: 'file',
  success (res) {
    // tempFilePath可以作为img标签的src属性显示图片
    const tempFilePaths = res.tempFiles
    console.log('选择',res);//这里log一下res的值
    console.log(tempFilePaths);
    tempFilePaths.forEach(i=>{
      console.log(i);
      wx.uploadFile({//调用上传文件接口
      url: 'http://localhost:9090/file/upload', //这个接口是后台给的
      filePath: i.path,
      name:'file',
      method:"post",
      header: {//headers记住传Authorization也就是token值，不然会返回401未登录
        "content-type": "multipart/form-data",
        "Authorization": wx.getStorageSync("token")
      },
      
      success (res){
        console.log(res);
        wx.showToast({
          title: '上传成功',
        })
        //上传成功后的一些操作
        wx.hideLoading();       
          let rs = JSON.parse(res.data);       
        if (rs.code == 0) {
          var str=rs.data.path
          console.log(str);
          var newStr = str.slice(0,4)+'s'+str.slice(4) 
            // console.log(newStr);
            const k = `${e.target.dataset.type}[${
              e.target.dataset.key
            }].filevalue`;
        for(var i=0;i<tempFilePaths.length;i++){

          files.push({name:tempFilePaths[i].name,path:newStr})
        }
          // files.push({name:tempFilePaths[0].name,path:newStr})
          that.setData({
           [k]:files,
           files:files,
          })
          console.log(that.data.three);
        } else {
          that.setData({
            // isshow: true,
            message: "上传失败,稍后重试"
          });
          setTimeout(() => {
            that.setData({
              //isshow: false,
              message: ""
            });
          }, 2500);
        }
      }
    })
    })
    
  }
})

  },
getFile(e){
  let id=wx.getStorageSync('id');
    get('/file/look/'+28,{},{}).then(res => {
      console.log('请求成功', res);
      this.setData({
        myFileDataObj:res.data
      })
      console.log(this.data.myFileDataObj);
      })
      .catch(error => {
      console.log('请求失败', error);
      });
     
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
    var that=this;
    that.getFile();
    that.onLoad();
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