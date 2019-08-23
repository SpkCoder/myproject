const config = require('../../config.js')

Page({
  makeRequest: function() {
    var self = this

    self.setData({
      loading: true
    })
    wx.request({
      url: config.requestUrl,
      method: "POST",
      data: {
        noncestr: Date.now()
      },
      success: function(result) {
        wx.showToast({
          title: '请求成功',
          icon: 'success',
          mask: true,
          duration: 2000
        })
        self.setData({
          loading: false
        })
        console.log('request success', result)
      },

      fail: function({errMsg}) {
        console.log('request fail', errMsg)
        wx.showToast({
          title: errMsg,
          icon: 'error',
          mask: true,
          duration: 2000
        })
        self.setData({
          loading: false
        })
      }
    })
  }
})
