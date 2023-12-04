
const baseURL = 'http://localhost:9090/user';

/**
 *  使用Promise 对wx.request进行分装
 * @param {*} params 
 */

function request(params = { methods, url, data }) {
  return  new Promise(function (resolve,reject) {
    wx.request({
      url: baseURL + params.url,
      method: params.method,
      data: params.data ? JSON.stringify(params.data) : null,
      header: { 
        'Content-Type': 'application/json',
        'accessToken': ''
       },
      timeout: 5000,
      success(res) { 
        if (res.statusCode == 200) {
          if (res.data.code == 0) {
            resolve(res.data);
          } else {
            wx.showToast({
              title: '提示',
              content: res.data.msg,
              showCancel: false,
              success:function(res) {}
            })
            reject(res,data);
          }
        } else {
          wx.showToast({
            title: '提示',
            content: '网络请求超时！',
            showCancel: false,
            success: function(res) {}
          })
          reject();
        } 

      },
      fail (err) {
        reject(err)
      }
    })
  })
}

module.exports = {
  request: request
}
