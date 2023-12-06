
const baseUrl = 'http://localhost:9090';
const request = (url, method, data, header = {}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url, // 拼接完整的url
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/json', // 设置请求的 header
        'token':wx.getStorageSync('token')
      },
      success(res) {
        const { statusCode, data } = res;
        if (statusCode >= 200 && statusCode < 300) {
          // 请求成功的处理
          resolve(data);
        } else {
          // 可以根据项目需求处理HTTP错误
          reject(`网络请求错误，状态码${statusCode}`);
        }
      },
      fail(err) {
        // 请求失败的处理
        reject(err);
      }
    });
  });
};

// 导出封装的request方法
module.exports = {
  get: (url, data, header) => request(url, 'GET', data, header),
  post: (url, data, header) => request(url, 'POST', data, header),
  deleteRequest: (url, data, header) => request(url, 'DELETE', data, header),
  // ...可以根据需要封装更多的方法如put, delete等
};
//实例
// post('/register',{
//   username:'five123',
//   password:'123123'
// },{}//token).then(res => {
//   console.log('请求成功', res);
// })
// .catch(error => {
//   console.log('请求失败', error);
// });