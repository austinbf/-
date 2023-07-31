// pages/index/indexItem/upLoadRecord/upLoadRecord.js
const recorderManager = wx.getRecorderManager();
const db = wx.cloud.database();
const recordCollection=db.collection('recordData');
Page({

  /**
   * 页面的初始数据
   */
  data: {
"recorderManager":null,
"tempFilePath":'',
'isAudioRecording':''//是否正在录音
  },
  startRecord() {

    let {recordManager} = this.data;

    if(!recordManager){
        recordManager = wx.getRecorderManager();
        recordManager.onStart((res)=>{
            this.setData({
                isAudioRecording:true
            })
        });
        recordManager.onStop((res) => {
            this.setData({
                isAudioRecording:false
            })

            let { tempFilePath } = res;
            //tempFilePath应该是mp3，但实际是wav，见控制台输出的值
            console.log(tempFilePath)



            wx.uploadFile({
                url: 'cloud1-9gabrxou0fca45e5',//这里的url仅仅是占位， 需要替换为uploadFile合法域名
                filePath: tempFilePath,
                name: 'file',
                success: (res) => {
                    console.log(res.data);

                },
                fail: (res) => {
                    //在微信电脑版下一定会fail，提示 no such file or directory
                    
                    //错误信息见控制台输出res，已经截图到开发者论坛
                    console.error(res);
                }
            });
        });

        this.setData({
            recordManager
        })
    }
   
    recordManager.start({
        duration: 60000,
        format: 'mp3' //声明录制mp3格式
    });
},
  stopRecord(){
    let { recordManager, isAudioRecording } = this.data;
    if (isAudioRecording) {
        recordManager && recordManager.stop();
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